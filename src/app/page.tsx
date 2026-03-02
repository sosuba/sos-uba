import {
  HeartPulse,
  Droplets,
  Phone,
  ShieldCheck,
  AlertTriangle,
  PackageCheck,
  MessageCircle,
} from "lucide-react";
import RegisterForm from "@/components/RegisterForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-blue-700">
              SOS <span className="text-gray-800">UBÁ</span>
            </span>
          </div>
          <a
            href="#cadastro"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-blue-700 active:scale-95"
          >
            Cadastrar Instituição
          </a>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 py-14 text-center">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
          <AlertTriangle className="h-3.5 w-3.5" />
          Situação de Emergência — Ubá/MG
        </span>

        <h1 className="mx-auto mt-2 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
          Apoio às Vítimas das{" "}
          <span className="text-blue-600">Enchentes em Ubá</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Estamos distribuindo doações de medicamentos e itens de higiene para
          instituições que prestam assistência às famílias afetadas pelas
          enchentes em Ubá. Cadastre sua instituição e receba os insumos de
          forma gratuita.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-500" />
            Gratuito e seguro
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1.5">
            <PackageCheck className="h-4 w-4 text-blue-500" />
            Entrega validada
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1.5">
            <HeartPulse className="h-4 w-4 text-blue-500" />
            Apoio logístico de medicamentos
          </span>
        </div>
      </section>

      {/* ── SEÇÃO DE INFORMAÇÃO ────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-blue-500">
          O que estamos distribuindo
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <HeartPulse className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Medicamentos Essenciais</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                Amoxicilina 250mg, Amoxicilina 500mg, Glibenclamida e Cimegripe para atender
                as necessidades mais urgentes das vítimas.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Higiene Básica</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                Itens de higiene pessoal para garantir saúde e dignidade às
                famílias desabrigadas durante a crise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO DE CADASTRO ──────────────────────────────── */}
      <section id="cadastro" className="mx-auto max-w-5xl px-4 pb-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-blue-100 bg-white p-6 shadow-xl sm:p-8">
          <div className="mb-6 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-md">
              <PackageCheck className="h-6 w-6 text-white" />
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-gray-900">
              Cadastrar Instituição
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Preencha os dados abaixo para solicitar os insumos.
            </p>
          </div>
          <RegisterForm />
        </div>
      </section>

      {/* ── SEÇÃO DE CONTATO DESTACADA ─────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white shadow-sm">
          <div className="bg-green-500 px-6 py-4 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-white/90">
              Precisa de ajuda?
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 px-6 py-7 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <MessageCircle className="h-7 w-7 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-gray-900">Lara Abreu</p>
              <a
                href="tel:+5532999992333"
                className="mt-0.5 flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                (32) 99999-2333
              </a>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Dúvidas sobre o cadastro ou a entrega? Fale diretamente com nossa
              coordenadora pelo WhatsApp.
            </p>
            <a
              href="https://wa.me/5532999992333"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-green-600 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Falar com Lara no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-blue-600" />
              <span className="font-extrabold text-blue-700">
                SOS <span className="text-gray-700">UBÁ</span>
              </span>
            </div>
            <a
              href="tel:+5532999992333"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              (32) 99999-2333 — Lara Abreu
            </a>
          </div>

          <div className="mt-6 flex items-start gap-2 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
            <p className="text-xs leading-relaxed text-yellow-800">
              <strong>Aviso:</strong> Todos os dados cadastrados passarão por
              validação da equipe SOS UBÁ antes da confirmação e entrega dos
              produtos. Informações falsas implicam cancelamento automático da
              solicitação.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            © 2026 SOS UBÁ · Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
