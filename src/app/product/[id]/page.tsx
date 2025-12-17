"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Play, Star } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  shopeeLink: string;
  siteLink: string;
  image: string;
  detailedDescription: string;
  differentials: string[];
  videos: { title: string; url: string }[];
  testimonials: { name: string; text: string; rating: number }[];
}

// Dados dos produtos com detalhes
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
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    detailedDescription: "A Vitamina B12 é essencial para a produção de glóbulos vermelhos e manutenção do sistema nervoso. Nossa fórmula de alta concentração ajuda a combater a fadiga, melhorar a cognição e manter níveis ótimos de energia ao longo do dia.",
    differentials: [
      "Fórmula biodisponível para melhor absorção",
      "Dose otimizada para adultos",
      "Livre de aditivos artificiais",
      "Produzido em laboratório certificado"
    ],
    videos: [
      { title: "Como a Vitamina B12 transforma sua energia", url: "#" },
      { title: "Benefícios para memória e foco", url: "#" }
    ],
    testimonials: [
      { name: "Maria S.", text: "Sinto muito mais energia durante o dia!", rating: 5 },
      { name: "João P.", text: "Melhorou minha concentração no trabalho.", rating: 5 }
    ]
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
    image: "https://images.unsplash.com/photo-1550572017-4814c6f5a5e6?w=400&h=400&fit=crop",
    detailedDescription: "Nossa fórmula exclusiva combina 5 tipos diferentes de magnésio (Dimalato, Treonato, Bisglicinato, Taurato e Citrato) para oferecer benefícios completos para saúde física e mental.",
    differentials: [
      "Combinação única de 5 formas de magnésio",
      "Alta biodisponibilidade",
      "Efeitos sinérgicos",
      "Suporte completo para bem-estar"
    ],
    videos: [
      { title: "Por que 5 tipos de magnésio?", url: "#" },
      { title: "Como melhorar o sono naturalmente", url: "#" }
    ],
    testimonials: [
      { name: "Ana L.", text: "Durmo muito melhor agora!", rating: 5 },
      { name: "Carlos M.", text: "Menos ansiedade no dia a dia.", rating: 5 }
    ]
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
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop",
    detailedDescription: "O L-Triptofano é um aminoácido precursor da serotonina, neurotransmissor responsável pelo bom humor e regulação do sono. Ajuda a equilibrar o humor e promover relaxamento.",
    differentials: [
      "Precursor natural da serotonina",
      "Auxilia na produção de melatonina",
      "Efeito calmante natural",
      "Suporte para saúde mental"
    ],
    videos: [
      { title: "Como o triptofano afeta o humor", url: "#" },
      { title: "Dicas para um sono reparador", url: "#" }
    ],
    testimonials: [
      { name: "Fernanda R.", text: "Me sinto muito mais calma.", rating: 5 },
      { name: "Roberto T.", text: "Melhorou meu humor significativamente.", rating: 5 }
    ]
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
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
    detailedDescription: "Blend natural de ervas como chá verde, hibisco, carqueja e gengibre, formulado para acelerar o metabolismo, reduzir retenção de líquidos e promover desintoxicação saudável.",
    differentials: [
      "Blend exclusivo de 10 ervas",
      "Ação termogênica natural",
      "Redução de inchaço",
      "Sem efeitos colaterais"
    ],
    videos: [
      { title: "Como acelerar o metabolismo", url: "#" },
      { title: "Receitas com Slim Chá", url: "#" }
    ],
    testimonials: [
      { name: "Patrícia O.", text: "Perdi 3kg em um mês!", rating: 5 },
      { name: "Lucas F.", text: "Menos inchaço e mais energia.", rating: 5 }
    ]
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
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
    detailedDescription: "Fórmula completa com colágeno Verisol, ácido hialurônico, silício orgânico e vitaminas C/E para saúde articular, redução de dores crônicas e fortalecimento ósseo.",
    differentials: [
      "Colágeno de alta absorção",
      "Combinação sinérgica de nutrientes",
      "Suporte para articulações",
      "Fortalecimento ósseo"
    ],
    videos: [
      { title: "Como aliviar dores articulares", url: "#" },
      { title: "Benefícios do colágeno para a pele", url: "#" }
    ],
    testimonials: [
      { name: "Sandra V.", text: "Minhas dores diminuíram muito.", rating: 5 },
      { name: "Pedro H.", text: "Mais mobilidade nas articulações.", rating: 5 }
    ]
  }
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = products[productId];

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <Link href="/" className="text-emerald-600 hover:text-emerald-700">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-xl text-gray-700">{product.description}</p>
            </div>

            {/* Detailed Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o Produto</h2>
              <p className="text-gray-700 leading-relaxed">{product.detailedDescription}</p>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefícios</h2>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Differentials */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Diferenciais</h2>
              <ul className="space-y-3">
                {product.differentials.map((diff, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-3 h-3 text-teal-600" />
                    </div>
                    <span className="text-gray-700">{diff}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Purchase Buttons */}
            <div className="space-y-4">
              <a
                href={product.shopeeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Comprar pela Shopee
                </div>
              </a>
              <Link
                href={product.siteLink}
                className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Comprar no Site
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Vídeos Explicativos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.videos.map((video, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <button className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Depoimentos de Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}