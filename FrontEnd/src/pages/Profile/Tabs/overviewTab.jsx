import { SocialItem, DetailRow } from "../components/ProfileBlocks";
/* ===================================================
   OVERVIEW TAB
   =================================================== */
function ProfileOverview({ user }) {
  return (
    <div className="space-y-6">
      <ProfileDetails user={user} />
      <SocialLinks user={user} />
    </div>
  );
}
export default ProfileOverview;

function ProfileDetails({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Account Details
      </h3>

      <div className="space-y-3 text-sm">
        <DetailRow label="User ID" value={user.id} />
        <DetailRow label="Username" value={user.username} />
        <DetailRow label="firstname" value={user.first_name} />
        <DetailRow label="lastname" value={user.last_name} />
        <DetailRow label="Email" value={user.email} />
      </div>
    </div>
  );
}

function SocialLinks({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Social Profiles
      </h3>

      <div className="space-y-3">
        <SocialItem name="Instagram" link={user.instagram} />
        <SocialItem name="LinkedIn" link={user.linkedin} />
      </div>
    </div>
  );
}
