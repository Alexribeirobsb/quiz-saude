"use client";

import { useState } from "react";
import { Heart, Sparkles, ShoppingBag, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  shopeeLink: string;
  siteLink: string;
  image: string;
}

const products: Record<string, Product> = {
  b12: {
    id: "b12",
    name: "Vitamina B12",
    description: "Energia e vitalidade para seu dia a dia",
    benefits: [
      "Aumenta energia e disposição",
      "Melhora foco e memória",
      "Previne anemia",
      "Fortalece o sistema nervoso"
    ],
    shopeeLink: "#",
    siteLink: "/checkout?product=b12",
    image: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/7c3a8952-1f8d-4e89-8dad-bbcf8ad5761c.png"
  },
  magnesios: {
    id: "magnesios",
    name: "5 Magnésios",
    description: "Fórmula completa com 5 tipos de magnésio",
    benefits: [
      "Reduz fadiga e cansaço",
      "Melhora qualidade do sono",
      "Alivia estresse e ansiedade",
      "Fortalece ossos e músculos"
    ],
    shopeeLink: "#",
    siteLink: "/checkout?product=magnesios",
    image: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/3c9284b6-859a-4295-a916-758a5fde52b1.png"
  },
  triptofano: {
    id: "triptofano",
    name: "L-Triptofano",
    description: "Bem-estar emocional e sono reparador",
    benefits: [
      "Melhora o humor naturalmente",
      "Reduz ansiedade e estresse",
      "Promove sono de qualidade",
      "Controla apetite por doces"
    ],
    shopeeLink: "#",
    siteLink: "/checkout?product=triptofano",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop"
  },
  slimcha: {
    id: "slimcha",
    name: "Slim Chá",
    description: "Emagrecimento natural e saudável",
    benefits: [
      "Acelera o metabolismo",
      "Reduz inchaço",
      "Desintoxica o organismo",
      "Auxilia no emagrecimento"
    ],
    shopeeLink: "#",
    siteLink: "/checkout?product=slimcha",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop"
  },
  natuvitta: {
    id: "natuvitta",
    name: "Natuvitta",
    description: "Alívio de dores e saúde articular",
    benefits: [
      "Alivia dores crônicas",
      "Fortalece articulações",
      "Melhora mobilidade",
      "Saúde óssea completa"
    ],
    shopeeLink: "#",
    siteLink: "/checkout?product=natuvitta",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop"
  }
};

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Como você avalia seu nível de energia e disposição no dia a dia?",
    options: [
      { label: "A) Sempre me sinto cansado(a) e sem energia.", value: "A" },
      { label: "B) Tenho altos e baixos, mas sinto cansaço com frequência.", value: "B" },
      { label: "C) Geralmente me sinto bem, mas gostaria de mais vitalidade.", value: "C" },
      { label: "D) Tenho muita energia e disposição.", value: "D" }
    ]
  },
  {
    id: 2,
    text: "Nos últimos tempos, como você descreveria seu humor e estado emocional?",
    options: [
      { label: "A) Sinto-me frequentemente triste, desanimado(a) ou deprimido(a).", value: "A" },
      { label: "B) Tenho sentido muita ansiedade e estresse.", value: "B" },
      { label: "C) Meu humor oscila bastante.", value: "C" },
      { label: "D) Sinto-me geralmente bem e equilibrado(a).", value: "D" }
    ]
  },
  {
    id: 3,
    text: "Como está a qualidade do seu sono?",
    options: [
      { label: "A) Tenho muita dificuldade para dormir ou meu sono não é reparador (insônia).", value: "A" },
      { label: "B) Durmo, mas acordo cansado(a) ou com frequência.", value: "B" },
      { label: "C) Meu sono é bom e reparador.", value: "C" }
    ]
  },
  {
    id: 4,
    text: "Você sente dores musculares, articulares ou crônicas com frequência?",
    options: [
      { label: "A) Sim, sinto dores fortes e persistentes (musculares, articulares, fibromialgia).", value: "A" },
      { label: "B) Sim, sinto dores leves ou ocasionais.", value: "B" },
      { label: "C) Não, raramente sinto dores.", value: "C" }
    ]
  },
  {
    id: 5,
    text: "Qual destas metas de saúde e bem-estar é mais importante para você agora?",
    options: [
      { label: "A) Emagrecer, reduzir inchaço e acelerar o metabolismo.", value: "A" },
      { label: "B) Aumentar minha energia e disposição.", value: "B" },
      { label: "C) Reduzir ansiedade, melhorar o humor e combater insônia.", value: "C" },
      { label: "D) Aliviar dores crônicas, articulares ou musculares.", value: "D" },
      { label: "E) Melhorar minha energia, foco, memória e qualidade do sono.", value: "E" }
    ]
  }
];

const principalMapping: Record<string, string> = {
  A: 'slimcha',
  B: 'b12',
  C: 'triptofano',
  D: 'natuvitta',
  E: 'magnesios'
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"landing" | "quiz" | "results">("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recommendedProducts, setRecommendedProducts] = useState<{ principal: Product; secundario: Product } | null>(null);

  const handleStartQuiz = () => {
    setCurrentStep("quiz");
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (questionId: number, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRecommendations(newAnswers);
    }
  };

  const calculateRecommendations = (finalAnswers: Record<number, string>) => {
    // Produto Principal
    const principalId = principalMapping[finalAnswers[5]];
    const principal = products[principalId];

    // Pontuação para Produto Secundário
    const pontos: Record<string, number> = {
      slimcha: 0,
      b12: 0,
      triptofano: 0,
      natuvitta: 0,
      magnesios: 0
    };

    // Pergunta 1
    const q1 = finalAnswers[1];
    if (q1 === 'A') { pontos.b12 += 2; pontos.magnesios += 1; }
    else if (q1 === 'B') { pontos.b12 += 1; pontos.magnesios += 1; }
    else if (q1 === 'C') { pontos.magnesios += 1; }

    // Pergunta 2
    const q2 = finalAnswers[2];
    if (q2 === 'A') { pontos.triptofano += 3; }
    else if (q2 === 'B') { pontos.triptofano += 2; pontos.magnesios += 1; }
    else if (q2 === 'C') { pontos.triptofano += 1; pontos.magnesios += 1; }

    // Pergunta 3
    const q3 = finalAnswers[3];
    if (q3 === 'A') { pontos.triptofano += 2; pontos.magnesios += 2; }
    else if (q3 === 'B') { pontos.triptofano += 1; pontos.magnesios += 1; }

    // Pergunta 4
    const q4 = finalAnswers[4];
    if (q4 === 'A') { pontos.natuvitta += 3; }
    else if (q4 === 'B') { pontos.natuvitta += 1; }

    // Encontrar o produto secundário com maior pontuação
    const order = ['slimcha', 'b12', 'triptofano', 'natuvitta', 'magnesios'];
    let maxScore = -1;
    let candidates: string[] = [];
    for (const prod of order) {
      if (pontos[prod] > maxScore) {
        maxScore = pontos[prod];
        candidates = [prod];
      } else if (pontos[prod] === maxScore) {
        candidates.push(prod);
      }
    }
    let secundarioId = candidates[0];
    if (secundarioId === principalId) {
      // Remover o principal e pegar o próximo
      candidates = candidates.filter(c => c !== principalId);
      secundarioId = candidates[0] || order.find(o => o !== principalId)!;
    }
    const secundario = products[secundarioId];

    setRecommendedProducts({ principal, secundario });
    setCurrentStep("results");
  };

  const getPrincipalReason = (product: Product, answer: string) => {
    const reasons: Record<string, string> = {
      slimcha: "Com base na sua prioridade de emagrecer, reduzir inchaço e acelerar o metabolismo, recomendamos o Slim Chá para ajudá-lo a alcançar seus objetivos de forma natural e saudável.",
      b12: "Com base na sua prioridade de aumentar energia e disposição, recomendamos a Vitamina B12 para fornecer o impulso necessário para seu dia a dia.",
      triptofano: "Com base na sua prioridade de reduzir ansiedade, melhorar o humor e combater insônia, recomendamos o L-Triptofano para promover bem-estar emocional e sono reparador.",
      natuvitta: "Com base na sua prioridade de aliviar dores crônicas, articulares ou musculares, recomendamos o Natuvitta para proporcionar alívio e saúde articular.",
      magnesios: "Com base na sua prioridade de melhorar energia, foco, memória e qualidade do sono, recomendamos os 5 Magnésios para uma fórmula completa que atende múltiplas necessidades."
    };
    return reasons[product.id] || "Este produto foi selecionado com base na sua resposta.";
  };

  const getSecundarioReason = (product: Product) => {
    const reasons: Record<string, string> = {
      slimcha: "Como complemento, o Slim Chá pode ajudar no emagrecimento e aceleração do metabolismo, potencializando seus resultados gerais de saúde.",
      b12: "Como complemento, a Vitamina B12 pode aumentar sua energia e disposição, ajudando a combater fadiga e melhorar o foco.",
      triptofano: "Como complemento, o L-Triptofano pode reduzir ansiedade, melhorar o humor e promover um sono de qualidade, equilibrando seu bem-estar emocional.",
      natuvitta: "Como complemento, o Natuvitta pode aliviar dores musculares e articulares, melhorando sua mobilidade e conforto diário.",
      magnesios: "Como complemento, os 5 Magnésios podem melhorar energia, foco, memória e qualidade do sono, oferecendo suporte abrangente para seu corpo."
    };
    return reasons[product.id] || "Este produto foi selecionado para complementar sua jornada de bem-estar.";
  };

  if (currentStep === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Heart className="w-8 h-8 text-emerald-600" />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                Saúde Natural
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-light">
              Descubra o que seu corpo precisa para ter mais energia e bem-estar!
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Responda algumas perguntas rápidas e receba recomendações personalizadas de suplementos naturais para sua saúde e vitalidade.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Natural</h3>
              <p className="text-gray-600 text-sm">Produtos naturais e seguros</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Resultados Comprovados</h3>
              <p className="text-gray-600 text-sm">Milhares de clientes satisfeitos</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personalizado</h3>
              <p className="text-gray-600 text-sm">Recomendações sob medida</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={handleStartQuiz}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-12 py-6 rounded-2xl text-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              Comece o Quiz Agora!
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              ⭐⭐⭐⭐⭐ Milhares de clientes satisfeitos!
            </p>
            <a
              href="#"
              className="text-emerald-600 hover:text-emerald-700 font-semibold underline"
            >
              Veja nossas avaliações na Shopee
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "quiz") {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {question.text}
            </h2>
            <div className="space-y-4">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className="w-full text-left p-6 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 hover:shadow-lg"
                >
                  <span className="text-lg text-gray-800">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "results" && recommendedProducts) {
    const { principal, secundario } = recommendedProducts;
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sua jornada para uma Saúde Natural começa aqui!
            </h1>
            <p className="text-xl text-gray-700">
              Com base nas suas respostas, estes são os produtos recomendados para transformar sua saúde e bem-estar:
            </p>
          </div>

          {/* Recommended Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Produto Principal */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="w-full h-80 bg-gray-50 flex items-center justify-center p-4">
                <img
                  src={principal.image}
                  alt={principal.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-emerald-600 mb-2">Recomendação Principal para Você</h2>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{principal.name}</h3>
                <p className="text-gray-700 mb-6">{principal.description}</p>

                {/* Personalized Reason */}
                <div className="bg-emerald-50 rounded-xl p-4 mb-6">
                  <p className="text-emerald-900 font-medium">
                    {getPrincipalReason(principal, answers[5])}
                  </p>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Benefícios:</h3>
                  <ul className="space-y-2">
                    {principal.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <a
                    href={principal.shopeeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Comprar na Shopee (5% de desconto)
                    </div>
                  </a>
                  <a
                    href={principal.siteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Comprar no site (15% de desconto)
                    </div>
                  </a>
                  <Link
                    href={`/product/${principal.id}`}
                    className="block w-full bg-white border-2 border-emerald-600 text-emerald-600 py-4 rounded-xl font-semibold text-center hover:bg-emerald-50 transition-all duration-200"
                  >
                    Saiba mais
                  </Link>
                </div>
              </div>
            </div>

            {/* Produto Secundário */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="w-full h-80 bg-gray-50 flex items-center justify-center p-4">
                <img
                  src={secundario.image}
                  alt={secundario.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-teal-600 mb-2">Complemento Recomendado para Potencializar Seus Resultados</h2>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{secundario.name}</h3>
                <p className="text-gray-700 mb-6">{secundario.description}</p>

                {/* Personalized Reason */}
                <div className="bg-teal-50 rounded-xl p-4 mb-6">
                  <p className="text-teal-900 font-medium">
                    {getSecundarioReason(secundario)}
                  </p>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Benefícios:</h3>
                  <ul className="space-y-2">
                    {secundario.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <a
                    href={secundario.shopeeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Comprar na Shopee (5% de desconto)
                    </div>
                  </a>
                  <a
                    href={secundario.siteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Comprar no site (15% de desconto)
                    </div>
                  </a>
                  <Link
                    href={`/product/${secundario.id}`}
                    className="block w-full bg-white border-2 border-teal-600 text-teal-600 py-4 rounded-xl font-semibold text-center hover:bg-teal-50 transition-all duration-200"
                  >
                    Saiba mais
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Restart Quiz */}
          <div className="text-center">
            <button
              onClick={handleStartQuiz}
              className="text-emerald-600 hover:text-emerald-700 font-semibold underline"
            >
              Refazer o Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}