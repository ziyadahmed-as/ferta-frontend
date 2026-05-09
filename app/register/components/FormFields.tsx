"use client";

import React from "react";

export const SectionHeader = ({
  number,
  title,
  color = "gradient-primary",
}: {
  number: string;
  title: string;
  color?: string;
}) => (
  <div className="flex items-center gap-3 mb-5">
    <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
      {number}
    </div>
    <h3 className="text-base font-semibold text-slate-800">{title}</h3>
  </div>
);

export const FormField = ({
  icon,
  label,
  id,
  type = "text",
  required,
  name,
  placeholder,
  value,
  onChange,
}: {
  icon?: React.ReactNode;
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
      {label}
    </label>
    <div className="relative">
      {icon && <span className="absolute left-4 top-3.5 text-slate-400">{icon}</span>}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? "pl-11" : "px-4"} pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all`}
      />
    </div>
  </div>
);
