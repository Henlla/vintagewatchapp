import { useState } from "react";
import ProfileSidebarComponents from "../components/ProfileSideBarComponents";

const ProfilePage = () => {
    const [token, setToken] = useState(localStorage.getItem("access_token"))

    return <>
        <div className="md:h-screen">
            <ProfileSidebarComponents />
        </div>
    </>;
}

export default ProfilePage;