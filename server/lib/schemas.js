import { z } from 'zod';

const TALENT_CATEGORIES = ['actor', 'artist', 'model', 'musician', 'video_editor', 'dancer', 'content_creator', 'cinematographer', 'voice_over', 'other'];

const socialLinksSchema = z.object({
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
  imdb: z.string().optional(),
  wikipedia: z.string().optional(),
}).strict();

const privacySettingsSchema = z.object({
  profileSearchable: z.boolean().optional(),
  showContactDetails: z.boolean().optional(),
  showPortfolioPublic: z.boolean().optional(),
  allowDirectMessages: z.boolean().optional(),
}).strict();

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['talent', 'director']),
  fullName: z.string().min(2).max(100),
  talentCategory: z.enum(TALENT_CATEGORIES).optional(),
  location: z.string().optional(),
  mobile: z.string().optional(),
  companyName: z.string().optional(),
  industryType: z.string().optional(),
});

export const updateProfileSchema = z
  .object({
    fullName: z.string().min(2).max(100).optional(),
    bio: z.string().max(500).optional(),
    location: z.string().max(100).optional(),
    mobile: z.string().max(20).optional(),
    skills: z.array(z.string()).optional(),
    experienceYears: z.number().min(0).max(60).optional(),
    talentCategory: z.enum(TALENT_CATEGORIES).optional(),
    physicalMetrics: z.object({
      height: z.string().optional(),
      weight: z.string().optional(),
      eyeColor: z.string().optional(),
      hairColor: z.string().optional(),
    }).strict().optional(),
    showreelUrl: z.union([z.string().url(), z.literal('')]).optional(),
    socialLinks: socialLinksSchema.optional(),
    privacySettings: privacySettingsSchema.optional(),
    companyName: z.string().max(100).optional(),
    industryType: z.string().max(100).optional(),
    previousProjects: z.array(z.string()).optional(),
    portfolio: z.array(z.object({
      type: z.enum(['image', 'video']).optional(),
      url: z.string().url(),
      title: z.string().max(100).optional(),
      description: z.string().max(500).optional(),
    }).strict()).optional(),
  })
  .strict();

export const createProjectSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  category: z.enum(['Film', 'Advertisement', 'Music Video', 'Web Series', 'Short Film', 'Theatre', 'Other']),
  budget: z.string().optional(),
  location: z.string().min(2).max(100),
  deadline: z.coerce.date().refine((date) => date > new Date(), { message: 'Deadline must be in the future' }),
  requirements: z.array(z.string()).optional(),
  status: z.enum(['open', 'draft']).optional(),
  projectImage: z.string().optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(['applied', 'shortlisted', 'auditioning', 'rejected', 'selected']),
});

export const scheduleAuditionSchema = z.object({
  auditionDate: z.coerce.date().refine((date) => date > new Date(), { message: 'Must be in the future' }),
  auditionLocation: z.string().min(2).max(200),
  auditionNotes: z.string().max(500).optional(),
});

export const submitVideoSchema = z.object({
  videoUrl: z.string().url(),
});

export const adminVerifySchema = z.object({
  verificationStatus: z.enum(['none', 'pending', 'verified', 'rejected']),
});

export const sendMessageSchema = z.object({
  receiverId: z.string().min(1),
  content: z.string().min(1).max(5000),
});

export const updateProjectSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).max(5000).optional(),
  category: z.enum(['Film', 'Advertisement', 'Music Video', 'Web Series', 'Short Film', 'Theatre', 'Other']).optional(),
  budget: z.string().max(100).optional(),
  location: z.string().min(2).max(100).optional(),
  deadline: z.coerce.date().refine((date) => date > new Date(), { message: 'Deadline must be in the future' }).optional(),
  status: z.enum(['open', 'closed', 'draft']).optional(),
  projectImage: z.union([z.string().url(), z.literal('')]).optional(),
}).strict();

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).optional(),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
}).strict();

export const adminLoginSchema = z.object({
  email: z.string().email('Must be a valid email address'),
  password: z.string().min(1, 'Password is required'),
}).strict();

export const updateUserRoleSchema = z.object({
  role: z.enum(['talent', 'director', 'admin']),
}).strict();

export const updateProjectStatusSchema = z.object({
  status: z.enum(['open', 'closed', 'draft']),
}).strict();
