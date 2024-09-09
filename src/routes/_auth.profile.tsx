import { auth } from "@/components/auth/services/auth";
import { ReactImage } from "@/components/image";
import { NetworkInfo } from "@/components/network-info";
import { cn } from "@/lib/utils";
import { erp } from "@/utils/erp";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as cheerio from "cheerio";

export const Route = createFileRoute("/_auth/profile")({
  component: Profile,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(profileOptions()),
});

function Profile() {
  const query = useSuspenseQuery(profileOptions());
  const {
    data: {
      name,
      profileImage,
      attendance,
      fine,
      branch,
      contact,
      dob,
      rollNo,
      userId,
      address,
      email,
      section,
    },
    dataUpdatedAt,
    error,
    isError,
    isSuccess,
    isFetching,
  } = query;

  return (
    <main className="space-y-5">
      <NetworkInfo
        dataUpdatedAt={dataUpdatedAt}
        error={error}
        isError={isError}
        isLoading={isFetching}
        isSuccess={isSuccess}
      />
      <div className="grid grid-cols-2 gap-x-10">
        <section className="flex flex-col items-center justify-center space-y-5 bg-secondary">
          <ReactImage src={profileImage} className="w-20 rounded-md" />
          <span className="text-lg font-extrabold">{name}</span>
        </section>

        <section>
          <Basic
            data={[
              { heading: "Profession", label: "Student" },
              { heading: "Section", label: section },
              { heading: "Contact", label: contact },
              { heading: "Email", label: email },
              { heading: "Location", label: address },
            ]}
          />
        </section>
      </div>

      <div className="mt-8 flex items-end">
        <Stats
          attendance={attendance}
          birthDate={dob}
          branch={branch}
          fine={fine}
          rollNumber={rollNo}
          userId={userId}
        />
      </div>
    </main>
  );
}

function Stats(props: {
  attendance?: string;
  fine?: string;
  branch?: string;
  userId?: string;
  rollNumber?: string;
  birthDate?: string;
}) {
  return (
    <section className="grid flex-1 grid-cols-2 gap-x-3 gap-y-7 bg-secondary px-2 py-24">
      <Group cHeading="text-4xl" heading={props.attendance} label="Attendance" />
      <Group cHeading="text-3xl" heading={props.fine} label="Security Deposit" />
      <Group cHeading="text-3xl" heading={props.branch} label="Branch" />
      <Group cHeading="text-3xl" heading={props.userId} label="Library Code" />
      <Group cHeading="text-xl" heading={props.rollNumber} label="University Roll Number" />
      <Group cHeading="text-xl" heading={props.birthDate} label="Birth Date" />
    </section>
  );
}

interface BasicProps {
  data: {
    heading?: string;
    label?: string;
  }[];
}
function Basic(props: BasicProps) {
  return (
    <div className="space-y-3 break-words">
      {props.data.map((item, _) => (
        <div key={_}>
          <p className="text-lg">{item.heading}</p>
          <p className="text-sm">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

interface GroupProps {
  heading?: string;
  label: string;
  cHeading?: string;
  cLabel?: string;
}
function Group({ cHeading, cLabel, label, heading }: GroupProps) {
  return (
    heading && (
      <div className="break-all text-center">
        <p className={cHeading}>{heading}</p>
        <p className={cn("text-xs", cLabel)}>{label}</p>
      </div>
    )
  );
}

export function profileOptions() {
  return queryOptions({
    queryKey: ["profile"],
    queryFn: async () => {
      const html = await erp.get(
        "https://erp.psit.ac.in/Student/Dashboard",
        auth.username,
        auth.password,
      );
      const $ = cheerio.load(html.data);
      const data = $.extract({
        attendance: ".badge.btn.btn-lg.btn-danger",
        fine: ".list-group-item.text-ellipsis:nth-child(2) > span",
        isDetained: ".list-group-item.text-ellipsis:nth-child(2) > p",
        name: ".media-left > button",
        profile: [
          {
            selector: ".media-body:nth-of-type(2) > table > tbody > tr",
            value: {
              label: "td",
              value: "td:nth-child(2)",
            },
          },
        ],
        profileImage: {
          selector: ".nav-profile > div > a > img",
          value: "src",
        },
      });

      const formattedData: {
        [key: string]: string | undefined;
      } = {};

      data.profile.forEach((iter) => {
        const key = iter.label?.trim().slice(0, -1).trim();
        if (key) formattedData[key] = iter.value;
      });

      const info = {
        address: formattedData["Permanent Address"],
        branch: formattedData["Branch"],
        contact: formattedData["Mobile No"],
        dob: formattedData["Birth Date"],
        email: formattedData["Email"],
        rollNo: formattedData["University Roll No"],
        section: formattedData["Section"],
        userId: formattedData["Library Code"],
        attendance: data.attendance,
        fine: data.isDetained ? "Detained" : data.fine,
        name: data.name,
        profileImage: data.profileImage,
      };

      return info;
    },
  });
}
