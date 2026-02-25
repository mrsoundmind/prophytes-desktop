export const getOrgColor = (userInfo, organizations) => {
  const orgColor =
    organizations.find((org) => org?.id === userInfo?.user?.organizationId) ||
    null;
  return orgColor;
};
