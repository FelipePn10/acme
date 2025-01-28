"use client";

import React, { useState } from 'react';
import { User, Building2, Mail, Lock, ArrowLeft, ArrowRight } from 'lucide-react';

const SignUpForm = () => {
  const [step, setStep] = useState('selection');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    cnpj: ''
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  if (step === 'selection') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-surface-primary">
        <div className="max-w-4xl w-full space-y-8 p-8 bg-dark-surface-secondary rounded-xl shadow-xl">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center">
              <span className="text-textOnAccent-primary text-2xl font-bold">A</span>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-dark-text-primary">Criar Conta</h2>
            <p className="mt-2 text-dark-text-secondary">Escolha o tipo de conta que melhor se adequa a você</p>
          </div>

          {/* Grid container com responsividade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setStep('user')}
              className="group p-6 bg-dark-surface-tertiary rounded-xl border-2 border-dark-border hover:border-accent-500 transition-all duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-accent-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <User className="w-6 h-6 text-textOnAccent-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-dark-text-primary">Conta Pessoal</h3>
                  <p className="mt-2 text-sm text-dark-text-secondary">
                    Para usuários individuais que desejam acessar nossos serviços
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setStep('business')}
              className="group p-6 bg-dark-surface-tertiary rounded-xl border-2 border-dark-border hover:border-accent-500 transition-all duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-accent-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-6 h-6 text-textOnAccent-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-dark-text-primary">Conta Empresarial</h3>
                  <p className="mt-2 text-sm text-dark-text-secondary">
                    Para empresas que precisam de recursos avançados e suporte dedicado
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-surface-primary">
      <div className="max-w-md w-full space-y-8 p-8 bg-dark-surface-secondary rounded-xl shadow-xl">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center">
            <span className="text-textOnAccent-primary text-2xl font-bold">A</span>
          </div>
        </div>

        <div>
          <button
            onClick={() => setStep('selection')}
            className="flex items-center text-dark-text-secondary hover:text-dark-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </button>
          
          <div className="text-center mt-4">
            <h2 className="text-3xl font-bold text-dark-text-primary">
              {step === 'business' ? 'Cadastro Empresarial' : 'Cadastro Pessoal'}
            </h2>
            <p className="mt-2 text-dark-text-secondary">Preencha seus dados para criar sua conta</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-text-secondary">
              {step === 'business' ? 'Nome do Responsável' : 'Nome Completo'}
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 bg-dark-surface-tertiary border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
              />
              <User className="absolute right-3 top-3 h-5 w-5 text-dark-text-tertiary" />
            </div>
          </div>

          {step === 'business' && (
            <>
              <div>
                <label className="block text-sm font-medium text-dark-text-secondary">
                  Nome da Empresa
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-dark-surface-tertiary border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    required
                  />
                  <Building2 className="absolute right-3 top-3 h-5 w-5 text-dark-text-tertiary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text-secondary">
                  CNPJ
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-dark-surface-tertiary border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-dark-text-secondary">
              Email
            </label>
            <div className="mt-1 relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 bg-dark-surface-tertiary border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
              />
              <Mail className="absolute right-3 top-3 h-5 w-5 text-dark-text-tertiary" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text-secondary">
              Senha
            </label>
            <div className="mt-1 relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 bg-dark-surface-tertiary border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                required
              />
              <Lock className="absolute right-3 top-3 h-5 w-5 text-dark-text-tertiary" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-textOnAccent-primary bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-colors"
          >
            Criar Conta
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>

          <p className="text-center text-sm text-dark-text-secondary">
            Já tem uma conta?{' '}
            <a href="#" className="text-accent-500 hover:text-accent-400">
              Faça login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;