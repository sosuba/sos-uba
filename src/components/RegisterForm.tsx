"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Building2,
  Hash,
  Users,
  Pill,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

type Priority = "Dipirona" | "Amoxicilina" | "Glibenclamida" | "Cimegripe" | "";

interface FormData {
  institutionName: string;
  cnpj: string;
  peopleCount: string;
  priority: Priority;
  address: string;
}

interface FormErrors {
  institutionName?: string;
  cnpj?: string;
  peopleCount?: string;
  priority?: string;
  address?: string;
}

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyIAg-q2S-myx9DT6Bu8pGqVzY3rcGthGM9F1--rEGWqgEHGjI8ctUsSMBxQFy2vjZ4/exec";

const EMPTY_FORM: FormData = {
  institutionName: "",
  cnpj: "",
  peopleCount: "",
  priority: "",
  address: "",
};

function formatCNPJ(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!formData.institutionName.trim())
      e.institutionName = "Nome da instituição é obrigatório.";
    if (formData.cnpj.replace(/\D/g, "").length !== 14)
      e.cnpj = "CNPJ inválido. Insira os 14 dígitos.";
    if (!formData.peopleCount || Number(formData.peopleCount) <= 0)
      e.peopleCount = "Informe um número válido de pessoas atendidas.";
    if (!formData.priority)
      e.priority = "Selecione a necessidade prioritária.";
    if (!formData.address.trim())
      e.address = "Endereço completo é obrigatório.";
    return e;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cnpj" ? formatCNPJ(value) : value,
    }));
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      nome_instituicao: formData.institutionName,
      cnpj: formData.cnpj,
      num_pessoas: Number(formData.peopleCount),
      medicamento_prioritario: formData.priority,
      endereco: formData.address,
    };

    console.log("📦 SOS UBÁ — Enviando para Google Sheets:", payload);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsSuccess(true);
    } catch {
      setSubmitError("Erro ao enviar. Verifique sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ── TELA DE SUCESSO ──────────────────────────────────────── */
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-gray-900">
            Solicitação enviada com sucesso!
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Os dados já estão na nossa planilha de triagem.
            <br />
            Em breve nossa equipe entrará em contato para agendar a entrega.
          </p>
        </div>

        <a
          href="https://wa.me/5532999736142"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-white shadow transition-all hover:bg-green-600 active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          Falar com Anne no WhatsApp
        </a>

        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData(EMPTY_FORM);
          }}
          className="text-xs text-gray-400 underline hover:text-gray-600 transition-colors"
        >
          Enviar nova solicitação
        </button>
      </div>
    );
  }

  /* ── FORMULÁRIO ───────────────────────────────────────────── */
  const inputBase =
    "w-full rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-400";
  const inputOk = "border-gray-200 bg-gray-50 focus:border-blue-400";
  const inputErr = "border-red-400 bg-red-50";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

      {/* Nome da Instituição */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="institutionName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-blue-500" />
          Nome da Instituição
        </label>
        <input
          id="institutionName"
          name="institutionName"
          type="text"
          placeholder="Ex: Associação Beneficente Ubá"
          value={formData.institutionName}
          onChange={handleChange}
          className={`${inputBase} ${errors.institutionName ? inputErr : inputOk}`}
        />
        {errors.institutionName && <FieldError msg={errors.institutionName} />}
      </div>

      {/* CNPJ */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cnpj" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Hash className="h-4 w-4 text-blue-500" />
          CNPJ
        </label>
        <input
          id="cnpj"
          name="cnpj"
          type="text"
          inputMode="numeric"
          placeholder="00.000.000/0000-00"
          value={formData.cnpj}
          onChange={handleChange}
          className={`${inputBase} ${errors.cnpj ? inputErr : inputOk}`}
        />
        {errors.cnpj && <FieldError msg={errors.cnpj} />}
      </div>

      {/* Número de Pessoas */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="peopleCount" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-500" />
          Número de Pessoas Atendidas
        </label>
        <input
          id="peopleCount"
          name="peopleCount"
          type="number"
          min="1"
          placeholder="Ex: 150"
          value={formData.peopleCount}
          onChange={handleChange}
          className={`${inputBase} ${errors.peopleCount ? inputErr : inputOk}`}
        />
        {errors.peopleCount && <FieldError msg={errors.peopleCount} />}
      </div>

      {/* Necessidade Prioritária */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="priority" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Pill className="h-4 w-4 text-blue-500" />
          Necessidade Prioritária
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className={`${inputBase} appearance-none cursor-pointer ${errors.priority ? inputErr : inputOk} ${
            formData.priority === "" ? "text-gray-400" : "text-gray-800"
          }`}
        >
          <option value="" disabled>Selecione o medicamento prioritário</option>
          <option value="Dipirona">Dipirona</option>
          <option value="Amoxicilina">Amoxicilina</option>
          <option value="Glibenclamida">Glibenclamida</option>
          <option value="Cimegripe">Cimegripe</option>
        </select>
        {errors.priority && <FieldError msg={errors.priority} />}
      </div>

      {/* Endereço Completo */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="address" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          Endereço Completo
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Rua, número, bairro, cidade — MG"
          value={formData.address}
          onChange={handleChange}
          className={`${inputBase} ${errors.address ? inputErr : inputOk}`}
        />
        {errors.address && <FieldError msg={errors.address} />}
      </div>

      {/* Erro de envio */}
      {submitError && (
        <p className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {submitError}
        </p>
      )}

      {/* Botão de envio */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Enviar Solicitação
          </>
        )}
      </button>

      {/* Aviso de logística */}
      <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
        <p className="text-xs leading-relaxed text-blue-800">
          <strong>Atenção:</strong> Após o cadastro, nossa equipe entrará em
          contato para validar as informações e informar se os itens serão{" "}
          <strong>entregues na instituição</strong> ou se deverão ser{" "}
          <strong>retirados em nosso centro de distribuição</strong>.
        </p>
      </div>

      {/* Contato de suporte abaixo do botão */}
      <div className="flex flex-col items-center gap-2 pt-1">
        <p className="text-xs text-gray-400">Dúvidas? Fale diretamente com nossa equipe:</p>
        <a
          href="https://wa.me/5532999736142"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition-all hover:bg-green-100 active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          Falar com Anne no WhatsApp
        </a>
      </div>

    </form>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="flex items-center gap-1 text-xs text-red-500">
      <AlertCircle className="h-3 w-3 shrink-0" />
      {msg}
    </p>
  );
}
