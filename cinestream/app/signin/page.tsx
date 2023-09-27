import { Metadata } from "next";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { DemoCookieSettings } from "./components/cookie-settings";
import { DemoCreateAccount } from "./components/create-account";
import { DemoDatePicker } from "./components/date-picker";
import { DemoGithub } from "./components/github-card";
import { DemoNotifications } from "./components/notifications";
import { DemoPaymentMethod } from "./components/payment-method";
import { DemoReportAnIssue } from "./components/report-an-issue";
import { DemoShareDocument } from "./components/share-document";
import { DemoTeamMembers } from "./components/team-members";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to account.",
};

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}

export default function CardsPage() {
  return (
    <div className=" flex m-20 relative items-center justify-center">
      <div className="col-span-4 md:col-span-2 lg:col-span-2  ">
        <DemoContainer>
          <DemoCreateAccount />
        </DemoContainer>
      </div>
    </div>
  );
}
