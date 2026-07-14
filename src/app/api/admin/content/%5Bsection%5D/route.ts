import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/db';

// Helper to authenticate admins on the server-side
async function verifyAdmin() {
  const session = await getServerSession(getAuthOptions());
  if (!session?.user || session.user.role !== 'ADMIN') {
    return false;
  }
  return true;
}

export async function GET(req: Request, { params }: { params: Promise<any> }) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
  }

  const { section } = await params;

  try {
    switch (section) {
      case 'projects':
        const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
        return NextResponse.json(projects);
      case 'experience':
        const experience = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
        return NextResponse.json(experience);
      case 'journey':
        const milestones = await prisma.journeyMilestone.findMany({ orderBy: { order: 'asc' } });
        return NextResponse.json(milestones);
      case 'skills':
        const categories = await prisma.skillCategory.findMany({
          include: { skills: { orderBy: { order: 'asc' } } },
          orderBy: { order: 'asc' },
        });
        return NextResponse.json(categories);
      case 'socials':
        const socials = await prisma.socialLink.findMany({ orderBy: { order: 'asc' } });
        return NextResponse.json(socials);
      case 'contact-info':
        const contact = await prisma.contactInfo.findFirst();
        return NextResponse.json(contact || {});
      case 'hero':
        const hero = await prisma.heroSection.findFirst();
        return NextResponse.json(hero || {});
      case 'seo':
        const seo = await prisma.seoMetadata.findMany();
        return NextResponse.json(seo);
      case 'settings':
        const settings = await prisma.setting.findMany();
        return NextResponse.json(settings);
      default:
        return NextResponse.json({ error: 'Unknown content section' }, { status: 400 });
    }
  } catch (err: any) {
    console.error(`Error in admin GET /api/admin/content/${section}:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<any> }) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
  }

  const { section } = await params;
  const body = await req.json();

  try {
    let result;
    switch (section) {
      case 'projects':
        result = await prisma.project.create({ data: { ...body, order: Number(body.order || 0) } });
        break;
      case 'experience':
        result = await prisma.experience.create({ data: { ...body, order: Number(body.order || 0) } });
        break;
      case 'journey':
        result = await prisma.journeyMilestone.create({ data: { ...body, order: Number(body.order || 0) } });
        break;
      case 'skills':
        // Creates a skill category or a skill within a category
        if (body.categoryId) {
          result = await prisma.skill.create({
            data: {
              name: body.name,
              categoryId: body.categoryId,
              order: Number(body.order || 0),
            },
          });
        } else {
          result = await prisma.skillCategory.create({
            data: {
              name: body.name,
              color: body.color || '#00ff88',
              order: Number(body.order || 0),
            },
          });
        }
        break;
      case 'socials':
        result = await prisma.socialLink.create({ data: { ...body, order: Number(body.order || 0) } });
        break;
      case 'seo':
        result = await prisma.seoMetadata.create({ data: body });
        break;
      default:
        return NextResponse.json({ error: 'Creation not supported directly for this section' }, { status: 400 });
    }

    // Log this creation activity
    await prisma.activity.create({
      data: {
        action: 'CONTENT_CREATE',
        details: `Created entry in ${section}: "${body.title || body.name || body.role || 'New Entry'}"`,
      },
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error(`Error in admin POST /api/admin/content/${section}:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<any> }) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
  }

  const { section } = await params;
  const body = await req.json();
  const { id, ...data } = body;

  try {
    let result;
    switch (section) {
      case 'projects':
        result = await prisma.project.update({ where: { id }, data: { ...data, order: Number(data.order || 0) } });
        break;
      case 'experience':
        result = await prisma.experience.update({ where: { id }, data: { ...data, order: Number(data.order || 0) } });
        break;
      case 'journey':
        result = await prisma.journeyMilestone.update({ where: { id }, data: { ...data, order: Number(data.order || 0) } });
        break;
      case 'skills':
        if (data.categoryId) {
          result = await prisma.skill.update({
            where: { id },
            data: { name: data.name, order: Number(data.order || 0) },
          });
        } else {
          result = await prisma.skillCategory.update({
            where: { id },
            data: { name: data.name, color: data.color, order: Number(data.order || 0) },
          });
        }
        break;
      case 'socials':
        result = await prisma.socialLink.update({ where: { id }, data: { ...data, order: Number(data.order || 0) } });
        break;
      case 'contact-info':
        // contact-info is a singleton
        const firstContact = await prisma.contactInfo.findFirst();
        if (firstContact) {
          result = await prisma.contactInfo.update({ where: { id: firstContact.id }, data });
        } else {
          result = await prisma.contactInfo.create({ data });
        }
        break;
      case 'hero':
        // hero is a singleton
        const firstHero = await prisma.heroSection.findFirst();
        if (firstHero) {
          result = await prisma.heroSection.update({ where: { id: firstHero.id }, data });
        } else {
          result = await prisma.heroSection.create({ data });
        }
        break;
      case 'seo':
        result = await prisma.seoMetadata.update({ where: { id }, data });
        break;
      case 'settings':
        // Settings are key-value updates
        result = await prisma.setting.upsert({
          where: { key: data.key },
          update: { value: data.value },
          create: { key: data.key, value: data.value },
        });
        break;
      default:
        return NextResponse.json({ error: 'Section update not supported' }, { status: 400 });
    }

    // Log this update activity
    await prisma.activity.create({
      data: {
        action: 'CONTENT_UPDATE',
        details: `Updated entry in ${section}: "${data.title || data.name || data.key || 'Updated Entry'}"`,
      },
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error(`Error in admin PUT /api/admin/content/${section}:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<any> }) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
  }

  const { section } = await params;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID parameter required' }, { status: 400 });
  }

  try {
    let result;
    switch (section) {
      case 'projects':
        result = await prisma.project.delete({ where: { id } });
        break;
      case 'experience':
        result = await prisma.experience.delete({ where: { id } });
        break;
      case 'journey':
        result = await prisma.journeyMilestone.delete({ where: { id } });
        break;
      case 'skills':
        // Checks if it is a skill or a full category
        const isSkill = searchParams.get('type') === 'skill';
        if (isSkill) {
          result = await prisma.skill.delete({ where: { id } });
        } else {
          result = await prisma.skillCategory.delete({ where: { id } });
        }
        break;
      case 'socials':
        result = await prisma.socialLink.delete({ where: { id } });
        break;
      case 'seo':
        result = await prisma.seoMetadata.delete({ where: { id } });
        break;
      default:
        return NextResponse.json({ error: 'Section deletion not supported' }, { status: 400 });
    }

    // Log this deletion activity
    await prisma.activity.create({
      data: {
        action: 'CONTENT_DELETE',
        details: `Deleted entry from ${section} (ID: ${id})`,
      },
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error(`Error in admin DELETE /api/admin/content/${section}:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
