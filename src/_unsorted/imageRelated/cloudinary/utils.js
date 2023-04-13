import { CldImage, CldUploadButton } from "next-cloudinary";
import { useState } from "react";
export function UploadButton() {
  return (
    <>
      <CldUploadButton
        onUpload={(error, result, widget) => {
          console.log(result?.info);
          setResource(result?.info); // Updating local state with asset details
          widget.close(); // Close widget immediately after successful upload
        }}
        uploadPreset="ml_unsigned"
      >
        Upload to Cloudinary
      </CldUploadButton>
    </>
  );
}

export function userImg(user) {
  return (
    <CldImage
      className="h-11 w-11 rounded-full mr-4"
      width="75"
      height="75"
      crop="fill"
      src={user.usrImg}
      alt={user.username}
    />
  );
}

export function sidebarImg(user) {
  return (
    <CldImage
      className="h-11 w-11 rounded-full"
      width="75"
      height="75"
      crop="fill"
      src={user.usrImg}
      alt={user.username}
    />
  );
}

export function userImgProfile(user) {
  return (
    <CldImage
      className="md rounded-full relative border-4 border-gray-900"
      width="1000"
      height="1000"
      crop="fill"
      src={user.usrImg}
      alt={user.username}
    />
  );
}

export default function img(url, alt, width, height) {
  return (
    <CldImage width={width} height={height} crop="fill" src={url} alt={alt} />
  );
}

// export default { userImg, img }
