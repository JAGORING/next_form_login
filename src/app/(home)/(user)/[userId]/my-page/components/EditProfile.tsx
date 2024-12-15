'use client';
import { useFormState } from 'react-dom';
import { updateUserProfile } from '../action';
import Input from '@/app/components/Input';
import FormButton from '@/app/components/FormButton';

export interface EditProfileType {
  user: {
    id: number;
    email: string;
    username: string;
    password: string;
    bio: string | null;
  };
}

const EditProfile = ({ user }: EditProfileType) => {
  const [state, action] = useFormState(updateUserProfile, null);
  return (
    <form action={action} className="space-y-4">
      <Input
        label="Username"
        name="username"
        defaultValue={user?.username}
        errors={state?.errors?.fieldErrors.username}
      />
      <Input
        label="Email"
        name="email"
        defaultValue={user?.email}
        errors={state?.errors?.fieldErrors.email}
      />
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-[#6b4f4f]">
          Bio
        </label>
        <textarea
          name="bio"
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 ${
            state?.errors?.fieldErrors.bio
              ? 'border-red-500 focus:ring-red-500'
              : 'border-[#e2ddd7] focus:ring-[#6b4f4f]'
          }`}
        ></textarea>
        {state?.errors?.fieldErrors.bio && (
          <p className="mt-1 text-sm text-red-500">{state.errors.fieldErrors.bio}</p>
        )}
      </div>
      <Input
        type="password"
        label="Current Password"
        name="currentpassword"
        errors={state?.errors?.fieldErrors.currentPassword}
      />
      <Input
        label="New Password"
        name="newPassword"
        errors={state?.errors?.fieldErrors.newPassword}
      />
      <FormButton text="Save Changes" />
    </form>
  );
};

export default EditProfile;
