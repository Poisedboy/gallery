import Image from "next/image";
import Link from "next/link";
import React from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/";

const Footer = async () => {
  const response = await fetch(`${apiUrl}api/public-info?type=all`, {
    method: "GET",
    cache: "no-cache",
  });
  const {
    data: { address, email, instagramLink, facebookLink, logo, numberPhone },
  } = await response.json();

  return (
    <div className="flex justify-center items-center">
      <div className="px-10 py-5 w-full xl:w-[1170px]">
        <div>
          <Image src={logo} width={115} height={38} alt="logo" />
        </div>
        <div className="flex justify-between flex-wrap">
          <div className="m-2 text-center">
            <p>Address: {address}</p>
            <p>Opening hours 10am - 6pm</p>
          </div>
          <div className="m-2 text-center">
            <p>
              <Link href={"mailto:info@mail.com"}>{email}</Link>
            </p>
            <p>
              <Link href={`tel: +38 ${numberPhone}`}>+38 {numberPhone}</Link>
            </p>
          </div>
          <div className="m-2">
            <p className="text-center">Follow</p>
            <div className="w-[200px] flex justify-around">
              <p>
                <Link href={instagramLink}>Instagram</Link>
              </p>
              <p>
                <Link href={facebookLink}>Facebook</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
