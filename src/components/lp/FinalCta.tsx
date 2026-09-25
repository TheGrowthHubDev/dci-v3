import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { ScheduleForm } from "./ScheduleForm";
import { ADDRESS, BrandOrbit, CONTACT_EMAIL, Reveal, SectionTag, WordReveal } from "./shared";

export function FinalCta() {
  return (
    <section
      id="fale-conosco"
      className="relative isolate overflow-hidden bg-brand-deep py-24 text-white lg:py-36"
    >
      {/* Fundo cinematográfico */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/dci/cta-backdrop.jpg"
          alt=""
          className="kenburns h-full w-full object-cover opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep via-brand-deep/70 to-brand-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/80 via-transparent to-brand-deep/80" />
        <div className="aurora opacity-60" />
      </div>
      <BrandOrbit className="absolute -left-40 top-1/2 hidden w-[640px] -translate-y-1/2 opacity-50 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="fade">
            <SectionTag tone="light">Próximo Passo</SectionTag>
          </Reveal>
          <WordReveal
            text="Escolha como você quer dar o próximo passo."
            className="text-display mt-6 text-white"
            stagger={50}
          />
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          {/* Contato direto */}
          <Reveal variant="left">
            <div id="agendar" className="glass h-full scroll-mt-28 rounded-[2rem] p-8 lg:p-12">
              <ScheduleForm />
              <div className="mt-10 space-y-3 border-t border-white/10 pt-6 text-sm text-white/75">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 font-semibold">
                  <Mail className="size-4 text-brand-light" aria-hidden="true" />
                  <span className="nav-underline">{CONTACT_EMAIL}</span>
                </a>
                <p className="flex items-center gap-3">
                  <MapPin className="size-4 shrink-0 text-brand-light" aria-hidden="true" />
                  {ADDRESS}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Diagnóstico DCI */}
          <Reveal variant="right" delay={120}>
            <div
              id="simulador"
              className="glow-brand relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-brand-deep/80 p-8 backdrop-blur-xl lg:p-12"
            >
              <div className="grid-lines pointer-events-none absolute inset-0 text-white opacity-40" aria-hidden="true" />
              <div className="relative flex h-full flex-col">
                <SectionTag tone="light">Diagnóstico DCI</SectionTag>
                <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight lg:text-4xl">
                  Um Discovery Centre faria sentido para a sua região?
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/80">
                  Responda algumas perguntas rápidas e veja quais caminhos fazem mais sentido para o
                  projeto que você está imaginando.
                </p>
                <Link
                  to="/diagnostico"
                  className="btn-shine group mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-brand-light to-brand-teal px-8 py-4 text-sm font-bold text-brand-deep"
                >
                  Fazer diagnóstico
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <p className="mt-4 text-xs font-semibold text-white/55">
                  Gratuito · Leva cerca de 2 minutos
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
