import { Fragment } from "react";
import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils/facades/serverFacades/strFacade";
import Link from "next/link";

const tiers = [
  {
    name: "cpanel",
    title: "Hosting Cpanel",
    id: "tier-basic",
    href: "https://hostingclan.com/home/services/buy-service/hosting-compartido",
    priceMonthly: "$1.99",
    description: "Quis suspendisse ut fermentum neque vivamus non tellus.",
    mostPopular: false,
  },
  {
    name: "cpanelDominio",
    title: "Hosting cPanel + Dominio",
    id: "tier-essential",
    href: "https://hostingclan.com/home/services/buy-service/hosting-cpanel",
    priceMonthly: "$43",
    description: "Quis eleifend a tincidunt pellentesque. A tempor in sed.",
    mostPopular: true,
  },
  {
    name: "wordpress",
    title: "Hosting Wordpress + Divi + Dominio",
    id: "tier-premium",
    href: "https://hostingclan.com/home/services/buy-service/hosting-wordpress",
    priceMonthly: "$49",
    description:
      "Orci volutpat ut sed sed neque, dui eget. Quis tristique non.",
    mostPopular: false,
  },
];
const sections = [
  {
    name: "Características cPanel",
    features: [
      {
        name: "Dominios ilimitados",
        tiers: { cpanel: true, cpanelDominio: true, wordpress: true },
      },
      {
        name: "SSL para todos los dominios",
        tiers: { cpanel: true, cpanelDominio: true, wordpress: true },
      },
      {
        name: "CPU Cores",
        tiers: { cpanel: "2", cpanelDominio: "2", wordpress: "2" },
      },
      {
        name: "30 Daily Backups",
        tiers: { cpanel: true, cpanelDominio: true, wordpress: true },
      },
      {
        name: "Emails ilimitados (ej: name@tudominio.com) & Webmails",
        tiers: { cpanel: true, cpanelDominio: true, wordpress: true },
      },
      {
        name: "Base de datos ilimitadas",
        tiers: { cpanel: true, cpanelDominio: true, wordpress: true },
      },
      {
        name: "Soporte para diferentes versiones de PHP, Node, Python, Ruby, etc.",
        tiers: { cpanel: true, cpanelDominio: true, wordpress: true },
      },
      {
        name: "SSD Storage",
        tiers: {
          cpanel: "1.2 GB",
          cpanelDominio: "5.56 GB",
          wordpress: "5.56 GB",
        },
      },
    ],
  },
  {
    name: "Características del servicio",
    features: [
      {
        name: "Incluye el registro de un dominio",
        tiers: { cpanel: false, cpanelDominio: true, wordpress: true },
      },
      {
        name: "Soporte por Tickets",
        tiers: { cpanel: true, cpanelDominio: true, wordpress: true },
      },
      {
        name: "Soporte por WhatsApp",
        tiers: { cpanel: false, cpanelDominio: true, wordpress: true },
      },
    ],
  },
  {
    name: "Características de Wordpress",
    features: [
      {
        name: "Instalación de Wordpress",
        tiers: { cpanel: false, cpanelDominio: false, wordpress: true },
      },
      {
        name: "Instalación de Divi de Elegant Themes",
        tiers: { cpanel: false, cpanelDominio: false, wordpress: true },
      },
      {
        name: "Activación de licencia Divi de Elegant Themes",
        tiers: { cpanel: false, cpanelDominio: false, wordpress: true },
      },
    ],
  },
];

export default function HostingPlans() {
  return (
    <div className="bg-white py-7 " id="prices">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Precios
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Los principales planes de hosting que ofrecemos
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Varias opciones para que puedas elegir la que mejor se adapte a tus
          necesidades. Seas un emprendedor, una pyme o una empresa grande.
        </p>

        {/* xs to lg */}
        <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
          {tiers.map((tier) => (
            <section
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-200"
                  : "",
                "p-8"
              )}
            >
              <h3
                id={tier.id}
                className="text-sm font-semibold leading-6 text-primary"
              >
                {tier.title}
              </h3>
              <p className="mt-2 flex items-baseline gap-x-1 text-primary">
                <span className="text-4xl font-bold">{tier.priceMonthly}</span>
                <span className="text-sm font-semibold">
                  {tier.name === "cpanel" ? " /mes" : "/año"}
                </span>
              </p>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                  "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                Comprar servicio
              </Link>
              <ul
                role="list"
                className="mt-10 space-y-4 text-sm leading-6 text-primary"
              >
                {sections.map((section) => (
                  <li key={section.name}>
                    <ul role="list" className="space-y-4">
                      {section.features.map((feature: any) =>
                        feature.tiers[tier.name] ? (
                          <li key={feature.name} className="flex gap-x-3">
                            <CheckIcon
                              className="h-6 w-5 flex-none text-indigo-600"
                              aria-hidden="true"
                            />
                            <span>
                              {feature.name}{" "}
                              {typeof feature.tiers[tier.name] === "string" ? (
                                <span className="text-sm leading-6 text-gray-500">
                                  ({feature.tiers[tier.name]})
                                </span>
                              ) : null}
                            </span>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className="isolate mt-20 hidden lg:block">
          <div className="relative -mx-8">
            {tiers.some((tier) => tier.mostPopular) ? (
              <div className="absolute inset-x-4 inset-y-0 -z-10 flex">
                <div
                  className="flex w-1/4 px-4"
                  aria-hidden="true"
                  style={{
                    marginLeft: `${
                      (tiers.findIndex((tier) => tier.mostPopular) + 1) * 25
                    }%`,
                  }}
                >
                  <div className="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5" />
                </div>
              </div>
            ) : null}
            <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
              <caption className="sr-only">Pricing plan comparison</caption>
              <colgroup>
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
              </colgroup>
              <thead>
                <tr>
                  <td />
                  {tiers.map((tier) => (
                    <th
                      key={tier.id}
                      scope="col"
                      className="px-6 pt-6 xl:px-8 xl:pt-8"
                    >
                      <div className="text-sm font-semibold leading-7 text-primary">
                        {tier.title}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <span className="sr-only">Price</span>
                  </th>
                  {tiers.map((tier) => (
                    <td key={tier.id} className="px-6 pt-2 xl:px-8">
                      <div className="flex items-baseline gap-x-1 text-primary">
                        <span className="text-4xl font-bold">
                          {tier.priceMonthly}
                        </span>
                        <span className="text-sm font-semibold leading-6">
                          {tier.name === "cpanel" ? " /mes" : "/año"}
                        </span>
                      </div>
                      <a
                        href={tier.href}
                        className={classNames(
                          tier.mostPopular
                            ? "bg-indigo-600 text-white hover:bg-indigo-500"
                            : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                          "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        )}
                      >
                        Buy plan
                      </a>
                    </td>
                  ))}
                </tr>
                {sections.map((section, sectionIdx) => (
                  <Fragment key={section.name}>
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className={classNames(
                          sectionIdx === 0 ? "pt-8" : "pt-16",
                          "pb-4 text-sm font-semibold leading-6 text-primary"
                        )}
                      >
                        {section.name}
                        <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10" />
                      </th>
                    </tr>
                    {section.features.map((feature: any) => (
                      <tr key={feature.name}>
                        <th
                          scope="row"
                          className="py-4 text-sm font-normal leading-6 text-primary"
                        >
                          {feature.name}
                          <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
                        </th>
                        {tiers.map((tier) => (
                          <td key={tier.id} className="px-6 py-4 xl:px-8">
                            {typeof feature.tiers[tier.name] === "string" ? (
                              <div className="text-center text-sm leading-6 text-gray-500">
                                {feature.tiers[tier.name]}
                              </div>
                            ) : (
                              <>
                                {feature.tiers[tier.name] === true ? (
                                  <CheckIcon
                                    className="mx-auto h-5 w-5 text-red-600"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <MinusIcon
                                    className="mx-auto h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}

                                <span className="sr-only">
                                  {feature.tiers[tier.name] === true
                                    ? "Included"
                                    : "Not included"}{" "}
                                  in {tier.name}
                                </span>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
