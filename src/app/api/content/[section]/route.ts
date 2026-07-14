import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<any> }) {
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
        return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    }
  } catch (err: any) {
    console.error(`Error in public content GET /api/content/${section}:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
