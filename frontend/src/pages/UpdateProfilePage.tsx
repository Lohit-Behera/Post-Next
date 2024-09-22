import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchUpdateUserDetails,
  fetchGetUserInfo,
  resetUserUpdate,
} from "@/features/UserSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, X } from "lucide-react";
function UpdateProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const getUserInfo = useSelector((state: any) => state.user.getUserInfo);
  const userDetails = getUserInfo.data || {};
  const getUserInfoStatus = useSelector(
    (state: any) => state.user.getUserInfoStatus
  );
  const updateUserDetails = useSelector(
    (state: any) => state.user.updateUserDetails
  );
  const updateUserDetailsStatus = useSelector(
    (state: any) => state.user.updateUserDetailsStatus
  );
  const updateUserDetailsError = useSelector(
    (state: any) => state.user.updateUserDetailsError
  );

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar, setAvatar] = useState("");
  const [editAvatar, setEditAvatar] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [editCoverImage, setEditCoverImage] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate(`/sign-in`);
    } else if (userId) {
      dispatch(fetchGetUserInfo(userId as string));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (updateUserDetailsStatus === "succeeded") {
      if (updateUserDetails.message === "User details updated successfully") {
        navigate(`/profile/${userId}?update=true`);
        dispatch(resetUserUpdate());
      }
    } else if (updateUserDetailsStatus === "failed") {
      console.log(`updateUserDetailsError: ${updateUserDetailsError}`);
      alert(updateUserDetailsError);
      dispatch(resetUserUpdate());
    }
  }, [updateUserDetailsStatus]);

  const handleEditProfile = () => {
    dispatch(
      fetchUpdateUserDetails({
        id: userId,
        fullName: fullName,
        bio: bio,
        website: website,
        avatar: avatar,
        coverImage: coverImage,
      })
    );
  };

  const handleAvatar = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      setAvatar(file);
    } else {
      alert("Please select an image file");
    }
  };

  const handleCoverImage = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      setCoverImage(file);
    } else {
      alert("Please select an image file");
    }
  };

  return (
    <>
      {getUserInfoStatus === "loading" || getUserInfoStatus === "idle" ? (
        <p>Loading</p>
      ) : getUserInfoStatus === "failed" ? (
        <p>Error</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="fullName">Full Name</Label>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="fullName"
                    type="fullName"
                    placeholder="full Name"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  type="text"
                  placeholder="Bio"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="website">Website</Label>
                </div>
                <Input
                  id="website"
                  type="text"
                  placeholder="Website"
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="avatar">Avatar</Label>
                </div>
                {editAvatar ? (
                  <div className="flex space-x-2">
                    <Input id="avatar" type="file" onChange={handleAvatar} />
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => {
                        setEditAvatar(false);
                        setAvatar("");
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <img
                      src={userDetails.avatar}
                      alt="avatar"
                      className="w-32 object-cover rounded-lg"
                    />
                    <Button
                      className="my-auto"
                      variant="secondary"
                      size="icon"
                      onClick={() => setEditAvatar(true)}
                    >
                      <Pencil />
                    </Button>
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="avatar">Cover Image</Label>
                </div>
                {editCoverImage ? (
                  <div className="flex space-x-2">
                    <Input
                      id="avatar"
                      type="file"
                      onChange={handleCoverImage}
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => {
                        setEditCoverImage(false);
                        setCoverImage("");
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    {userDetails.coverImage ? (
                      <img
                        src={userDetails.coverImage}
                        alt="avatar"
                        className="w-32 object-cover rounded-lg"
                      />
                    ) : (
                      <p className="my-auto">No cover image</p>
                    )}
                    <Button
                      className="my-auto"
                      variant="secondary"
                      size="icon"
                      onClick={() => setEditCoverImage(true)}
                    >
                      <Pencil />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 ">
            <Button className="w-full" size="sm" onClick={handleEditProfile}>
              Save
            </Button>
            <Button className="w-full" size="sm">
              Change Password
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default UpdateProfilePage;
