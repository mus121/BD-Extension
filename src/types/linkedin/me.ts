// src/types/linkedin/me.ts

export type VectorImageArtifact = {
  width: number;
  fileIdentifyingUrlPathSegment: string;
  expiresAt: number;
  height: number;
};

export type VectorImage = {
  artifacts: VectorImageArtifact[];
  rootUrl: string;
};

export type MiniProfile = {
  firstName: string;
  lastName: string;
  publicIdentifier: string;
  picture: { "com.linkedin.common.VectorImage": VectorImage };
  location?: string;
};

export type TMeProfile = {
  miniProfile: MiniProfile;
  publicContactInfo?: {
    emailAddress?: string;
  };
  education?: { degree?: string }[];
};

export type TUserBasicInfo = {
  [x: string]: any;
  name: string;
  email: string | null;
  profilePicture: string | null;
  location: string | null;
  education: string | null;
};

export const extractUserBasicInfo = (profile: TMeProfile): TUserBasicInfo => {
  const { miniProfile, publicContactInfo } = profile;

  // Extract Name
  const name = `${miniProfile.firstName} ${miniProfile.lastName}`;

  // Extract Email
  const email = publicContactInfo?.emailAddress || null;

  // Extract Profile Picture URL
  const profilePicture =
    miniProfile.picture?.["com.linkedin.common.VectorImage"]?.rootUrl +
      miniProfile.picture?.["com.linkedin.common.VectorImage"]?.artifacts[0]
        ?.fileIdentifyingUrlPathSegment || null;

  // Extract Location
  const location = miniProfile?.location || null;

  // Extract Education
  const education = profile?.education?.[0]?.degree || null;

  return {
    name,
    email,
    profilePicture,
    location,
    education,
  };
};
