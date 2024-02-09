"use client";

import { useEffect } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const FloatingWhatsAppButton = () => {
  const getCountryByIp = async () => {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    localStorage.setItem("country", data.country);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("country")) return;

      getCountryByIp().then((res) => {
        console.log(res);
      });
    }
  }, []);

  const getPhoneNumber = () => {
    if (typeof window !== "undefined") {
      const country = localStorage.getItem("country");

      switch (country) {
        case "CU":
          return "+59892907594";
        case "BR":
          return "+59892907594";
        default:
          return "+59892907594";
      }
    }else {
      return "+59892907594";
    }
  };

  return (
    <div>
      <FloatingWhatsApp
        phoneNumber={typeof window !== "undefined" ? getPhoneNumber() : "59892907594"}
        accountName="The Hosting Clan Support"
        avatar="https://hostingclan.com/assets/img/logowhite.png"
        darkMode={false}
        allowEsc
      />
    </div>
  );
};

export default FloatingWhatsAppButton;
