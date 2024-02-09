import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
export default function Testimonials() {
  return (
    <section className=" py-14   sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
            <Image
              className="h-12 w-auto self-start"
              src="/assets/img/clients/hic.png"
              alt=""
              width={150}
              height={150}
            />
            <figure className="mt-10 flex flex-auto flex-col justify-between">
              <blockquote className="text-lg leading-8 text-primary">
                <p>
                  “Mi experiencia con The Hosting Clan, ha sido excepcional en
                  todos los aspectos. Desde el rendimiento rápido y el uptime
                  impecable hasta la interfaz intuitiva y la seguridad robusta,
                  The Hosting Clan ha superado mis expectativas. Su servicio al
                  cliente es destacable, siempre dispuestos a resolver cualquier
                  consulta de manera eficiente. En cuanto a los resultados de
                  SEO obtenidos para nuestros clientes 100% de efectividad.
                  Agradecido de trabajar junto a ustedes 🤙”
                </p>
              </blockquote>
              <div className="flex gap-x-1 text-yellow-500 mt-4">
                <StarIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                <StarIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                <StarIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                <StarIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                <StarIcon className="h-5 w-5 flex-none" aria-hidden="true" />
              </div>
              <figcaption className="mt-7 flex items-center gap-x-6">
                <Image
                  className="h-14 w-14 rounded-full bg-gray-50"
                  src="/assets/img/testimonial2.webp"
                  alt=""
                  width={77}
                  height={77}
                />
                <div className="text-base">
                  <div className="font-semibold text-primary">Yadiel</div>
                  <div className="mt-1 text-gray-500">CEO de HICSEO</div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
            <Image
              className="h-12 w-auto self-start"
              src="/assets/img/clients/cluzstudio.png"
              alt=""
              width={150}
              height={150}
            />
            <figure className="mt-10 flex flex-auto flex-col justify-between">
              <blockquote className="text-lg leading-8 text-primary">
                <p>
                  “Todos nuestros clientes que necesitan sitios webs
                  corporativos o basados en Wordpress los hospedamos con Hosting
                  Clan. No solamente la velocidad es increíble, sino que el
                  tiempo de respuesta del soporte directamente por WhatsApp es
                  casi instantaneo. Recomiendo 100% Hosting Clan para cualqueir
                  tipo de empresas o proyectos de emprendedores y
                  desarrolladores individuales ”
                </p>
              </blockquote>
              
              <div className="flex gap-x-1 text-yellow-500 mt-1">
                <StarIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                <StarIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                <StarIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                <StarIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                <StarIcon className="h-5 w-5 flex-none" aria-hidden="true" />
              </div>
              <figcaption className="mt-10 flex items-center gap-x-6">
                <Image
                  className="h-14 w-14 rounded-full bg-gray-50"
                  src="/assets/img/testimonial1.jpg"
                  alt=""
                  width={77}
                  height={77}
                />
                <div className="text-base">
                  <div className="font-semibold text-primary">
                    Royler Marichal Carrazana
                  </div>
                  <div className="mt-1 text-gray-500">CEO de C luz Studio</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
