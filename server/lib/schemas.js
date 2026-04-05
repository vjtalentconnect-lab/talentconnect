import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const updateProfileSchema = z
  .object({
    fullName: z.string().min(2).optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    mobile: z.string().optional(),
    skills: z.array(z.string()).optional(),
    experienceYears: z.number().optional(),
    talentCategory: z
      .enum(['actor', 'artist', 'model', 'musician', 'video_editor', 'dancer', 'content_creator', 'cinematographer', 'voice_over', 'other'])
      .optional(),
    physicalMetrics: z.record(z.any()).optional(),
    showreelUrl: z.string().url().optional(),
    socialLinks: z.record(z.any()).optional(),
    privacySettings: z.record(z.any()).optional(),
    companyName: z.string().optional(),
    industryType: z.string().optional(),
    previousProjects: z.array(z.string()).optional(),
  })
  .strict();

export const createProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.enum(['Film', 'Advertisement', 'Music Video', 'Web Series', 'Short Film', 'Theatre', 'Other']),
  budget: z.string().optional(),
  location: z.string().min(2),
  deadline: z.coerce.date().refine((date) => date > new Date(), { message: 'Deadline must be in the future' }),
  requirements: z.array(z.string()).optional(),
  status: z.enum(['open', 'draft']).optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(['applied', 'shortlisted', 'auditioning', 'rejected', 'selected']),
});

export const submitVideoSchema = z.object({
  videoUrl: z.string().url(),
});

export const adminVerifySchema = z.object({
  verificationStatus: z.enum(['none', 'pending', 'verified', 'rejected']),
  isVerified: z.boolean().optional(),
}).refine(
  (data) => (data.verificationStatus === 'verified') === Boolean(data.isVerified),
  {
    message: "verificationStatus 'verified' must match isVerified being true, and vice versa",
    path: ['isVerified'],
  }
);

const TALENT_CATEGORIES = ['actor', 'artist', 'model', 'musician', 'video_editor', 'dancer', 'content_creator', 'cinematographer', 'voice_over', 'other'];

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['talent', 'director']),
  fullName: z.string().min(2),
  talentCategory: z.enum(TALENT_CATEGORIES).optional(),
  location: z.string().optional(),
  mobile: z.string().optional(),
  companyName: z.string().optional(),
  industryType: z.string().optional(),
});
