import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FileDown, Loader2, MousePointer2, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import DSPipeline from './shared/DSPipeline';
import TimeSeriesNode from './mapNodes/TimeSeriesNode';
import TransformerNode from './mapNodes/TransformerNode';
import CNNNode from './mapNodes/CNNNode';
import ANNNode from './mapNodes/ANNNode';
import LinearNode from './mapNodes/LinearNode';
import BayesianNode from './mapNodes/BayesianNode';
import DimReductionNode from './mapNodes/DimReductionNode';
import TreesNode from './mapNodes/TreesNode';
import EnsembleNode from './mapNodes/EnsembleNode';
import KNNNode from './mapNodes/KNNNode';
import SVMNode from './mapNodes/SVMNode';
import KernelNode from './mapNodes/KernelNode';
import ClusteringNode from './mapNodes/ClusteringNode';
import AutoEncodersNode from './mapNodes/AutoEncodersNode';
import GenerativeNode from './mapNodes/GenerativeNode';
import RLNode from './mapNodes/RLNode';
import GeneticNode from './mapNodes/GeneticNode';
import GNNNode from './mapNodes/GNNNode';
import RNNNode from './mapNodes/RNNNode';


interface InteractiveMapProps {}

type Region = { id: string; label: string; desc: string; subTopics: string[]; category: string; color: string; text: string; br: string; customNode?: () => React.ReactNode; illustration?: () => React.ReactNode; theory?: React.ReactNode; app?: React.ReactNode; };
const regions: Region[] = [
  // Neural Networks (Blue spectrum)
  { 
    id: 'transformers', 
    label: 'Transformers (LLMs)', 
    desc: 'Le mécanisme d\'Attention a tout changé. Base des modèles modernes de NLP.', 
    subTopics: ['Self-Attention', 'GPT / BERT', 'Multi-Head'],
    category: 'nn', 
    color: 'border-[#5ea1d4]', 
    text: 'text-white/90', 
    br: '20px 40px 20px 40px',
    customNode: () => <TransformerNode />,
    illustration: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 stroke-current text-current fill-current">
        <rect x="25" y="20" width="50" height="60" rx="6" fill="none" strokeWidth="2.5" strokeDasharray="3,3"/>
        <rect x="35" y="30" width="30" height="15" rx="3" className="opacity-80"/>
        <text x="50" y="40" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">ATTN</text>
        <line x1="50" y1="45" x2="50" y2="55" strokeWidth="2"/>
        <rect x="35" y="55" width="30" height="15" rx="3" className="opacity-80"/>
        <text x="50" y="65" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">FFN</text>
        <path d="M75 35 Q 85 50 75 65" fill="none" strokeWidth="1.5" strokeDasharray="2,2"/>
      </svg>
    )
  },
  { 
    id: 'cnn', 
    label: 'Réseaux Convolutifs (CNN)', 
    desc: 'Filtres de convolution balayant l\'image pour en extraire des features hiérarchiques.', 
    subTopics: ['Convolution', 'Max Pooling', 'ResNet / VGG'],
    category: 'nn', 
    color: 'border-[#2b85c4]', 
    text: 'text-white/90', 
    br: '15px 30px 20px 15px',
    customNode: () => <CNNNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <rect x="15" y="20" width="25" height="25" fill="currentColor" className="opacity-20"/>
         <rect x="15" y="20" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="1.5"/>
         <rect x="20" y="25" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2"/>
         <line x1="30" y1="30" x2="55" y2="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
         <rect x="55" y="30" width="15" height="15" fill="currentColor" className="opacity-50"/>
         <rect x="55" y="30" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5"/>
         <line x1="70" y1="37.5" x2="85" y2="37.5" stroke="currentColor" strokeWidth="2"/>
         <circle cx="85" cy="37.5" r="4" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 'ann', 
    label: 'Réseaux Denses (ANN)', 
    desc: 'Multilayer Perceptron (MLP). Couches successives de neurones pour la classification.', 
    subTopics: ['Forward Pass', 'Backprop', 'ReLU'],
    category: 'nn', 
    color: 'border-[#35a2ed]', 
    text: 'text-white/90', 
    br: '30px 20px 40px 20px',
    customNode: () => <ANNNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-30 stroke-current text-current fill-current">
         <circle cx="20" cy="20" r="4" fill="currentColor"/>
         <circle cx="20" cy="40" r="4" fill="currentColor"/>
         <circle cx="20" cy="60" r="4" fill="currentColor"/>

         <circle cx="50" cy="25" r="5" fill="currentColor"/>
         <circle cx="50" cy="55" r="5" fill="currentColor"/>

         <circle cx="80" cy="40" r="4" fill="currentColor"/>

         <line x1="24" y1="20" x2="45" y2="25" stroke="currentColor" strokeWidth="1"/>
         <line x1="24" y1="40" x2="45" y2="25" stroke="currentColor" strokeWidth="1"/>
         <line x1="24" y1="60" x2="45" y2="55" stroke="currentColor" strokeWidth="1"/>
         <line x1="24" y1="40" x2="45" y2="55" stroke="currentColor" strokeWidth="1"/>
         
         <line x1="55" y1="25" x2="76" y2="40" stroke="currentColor" strokeWidth="1.5"/>
         <line x1="55" y1="55" x2="76" y2="40" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  { 
    id: 'rnn', 
    label: 'Réseaux Récurrents (RNN)', 
    desc: 'Une mémoire interne pour gérer des séquences de taille variable (texte, voix, temps).', 
    subTopics: ['LSTM', 'GRU', 'Seq2Seq'],
    category: 'nn', 
    color: 'border-[#256c9e]', 
    text: 'text-white/90', 
    br: '40px 15px 30px 20px',
    customNode: () => <RNNNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <rect x="35" y="30" width="30" height="20" rx="4" fill="currentColor" className="opacity-20"/>
         <rect x="35" y="30" width="30" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5"/>
         <path d="M 50 30 C 50 5, 80 5, 80 30 C 80 40, 65 40, 65 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3"/>
         <polygon points="65,40 69,36 69,44" fill="currentColor"/>
         <line x1="15" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="2"/>
         <line x1="70" y1="40" x2="85" y2="40" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  { 
    id: 'auto-encoders', 
    label: 'Auto-Encodeurs', 
    desc: 'Compression d\'une donnée dans un espace latent puis reconstruction pour isoler l\'essentiel.', 
    subTopics: ['Espace Latent', 'Encodeur', 'Décodeur'],
    category: 'nn', 
    color: 'border-[#225785]', 
    text: 'text-white/90', 
    br: '30px 40px 15px 25px',
    customNode: () => <AutoEncodersNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <polygon points="10,20 35,35 35,45 10,60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
         <rect x="40" y="35" width="20" height="10" rx="2" fill="currentColor" className="opacity-80"/>
         <polygon points="90,20 65,35 65,45 90,60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
         <line x1="30" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="1,1"/>
         <line x1="60" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="1,1"/>
      </svg>
    )
  },
  { 
    id: 'gnn', 
    label: 'Graph Neural Networks (GNN)', 
    desc: 'Réseaux de neurones conçus pour traiter des données structurées sous forme de graphes.', 
    subTopics: ['Message Passing', 'GCN', 'GraphSAGE'],
    category: 'nn', 
    color: 'border-[#8b5cf6]', 
    text: 'text-white/90', 
    br: '20px 25px 35px 20px',
    customNode: () => <GNNNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
        <circle cx="30" cy="25" r="5" fill="currentColor" />
        <circle cx="70" cy="20" r="5" fill="currentColor" />
        <circle cx="50" cy="55" r="5" fill="currentColor" />
        <circle cx="20" cy="60" r="5" fill="currentColor" />
        <line x1="30" y1="25" x2="70" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="30" y1="25" x2="50" y2="55" stroke="currentColor" strokeWidth="1.5" />
        <line x1="70" y1="20" x2="50" y2="55" stroke="currentColor" strokeWidth="1.5" />
        <line x1="30" y1="25" x2="20" y2="60" stroke="currentColor" strokeWidth="1.5" />
        <line x1="50" y1="55" x2="20" y2="60" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
  { 
    id: 'gans', 
    label: 'Modèles Génératifs', 
    desc: 'Génération de nouvelles données par adversarité (Générateur vs Discriminateur) ou débruitage.', 
    subTopics: ['GANs', 'Diffusion', 'VAE'],
    category: 'nn', 
    color: 'border-[#1b7380]', 
    text: 'text-white/90', 
    br: '20px 30px 10px 40px',
    customNode: () => <GenerativeNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <circle cx="20" cy="40" r="12" fill="currentColor" className="opacity-20"/>
         <text x="20" y="44" fontSize="12" fill="currentColor" textAnchor="middle" fontWeight="bold">Z</text>
         <path d="M 35 40 L 50 40" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2"/>
         <rect x="55" y="25" width="25" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5"/>
         <circle cx="67.5" cy="40" r="6" fill="currentColor" className="opacity-80"/>
         <line x1="85" y1="40" x2="95" y2="40" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },

  { 
    id: 'linear', 
    label: 'Modèles Linéaires', 
    desc: 'La fondation du Machine Learning. Ajustement et prédictions optimales.', 
    subTopics: ['Régression Linéaire', 'Logistique', 'Polynomiale', 'Régularisation'],
    category: 'param', 
    color: 'border-[#ff8c1c]', 
    text: 'text-white/90', 
    br: '30px 20px 20px 20px',
    customNode: () => <LinearNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         {/* Curve instead of straight line for hand-drawn feel */}
         <path d="M 10 70 Q 50 45 90 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
         <circle cx="20" cy="65" r="3" fill="currentColor" className="opacity-80"/>
         <circle cx="42" cy="48" r="3" fill="currentColor" className="opacity-80"/>
         <circle cx="58" cy="42" r="3" fill="currentColor" className="opacity-80"/>
         <circle cx="78" cy="28" r="3" fill="currentColor" className="opacity-80"/>
         {/* Residuals */}
         <path d="M 42 48 L 42 53" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
         <path d="M 58 42 L 58 37" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
      </svg>
    )
  },
  { 
    id: 'bayesian', 
    label: 'Statistiques Bayésiennes', 
    desc: 'Un cadre probabiliste où la croyance s\'affine avec les données (Prior + Likelihood = Posterior).', 
    subTopics: ['Naïve Bayes', 'Réseaux Bayésiens', 'Processus Gaussiens'],
    category: 'param', 
    color: 'border-[#cc6606]', 
    text: 'text-white/90', 
    br: '15px 30px 20px 15px',
    customNode: () => <BayesianNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <path d="M 10 70 Q 30 20 50 20 Q 70 20 90 70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
         <path d="M 10 70 Q 35 15 55 15 Q 75 15 90 70" fill="currentColor" className="opacity-20" />
         <path d="M 10 70 Q 35 15 55 15 Q 75 15 90 70" fill="none" stroke="currentColor" strokeWidth="2.5" />
         <circle cx="55" cy="15" r="3" fill="currentColor" />
         <line x1="55" y1="15" x2="55" y2="70" stroke="currentColor" strokeWidth="1" strokeDasharray="1,1" />
      </svg>
    )
  },
  { 
    id: 'dim-reduction', 
    label: 'Réduction de Dimension', 
    desc: 'Compression de l\'information en conservant la structure. Projette des grands espaces (ex: 100D) en 2D ou 3D.', 
    subTopics: ['ACP / PCA', 't-SNE', 'UMAP'],
    category: 'param', 
    color: 'border-[#ab4107]', 
    text: 'text-white/90', 
    br: '20px 40px 10px 30px',
    customNode: () => <DimReductionNode />,
    illustration: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
         <path d="M10 90 L90 10" stroke="currentColor" strokeWidth="2.5"/>
         <circle cx="30" cy="70" r="3" fill="currentColor"/>
         <path d="M30 70 L40 60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
         <circle cx="20" cy="50" r="3" fill="currentColor"/>
         <path d="M20 50 L35 35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
         <circle cx="60" cy="80" r="3" fill="currentColor"/>
         <path d="M60 80 L75 65" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
         <circle cx="40" cy="60" r="2" fill="currentColor"/>
         <circle cx="35" cy="35" r="2" fill="currentColor"/>
         <circle cx="75" cy="65" r="2" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 'rl', 
    label: 'Reinforcement Learning', 
    desc: 'Un agent apprend par essai-erreur en recevant des récompenses dans un environnement.', 
    subTopics: ['Q-Learning', 'Policy Gradients', 'PPO / DDPG'],
    category: 'rl', 
    color: 'border-[#d61148]', 
    text: 'text-white/90', 
    br: '30px 20px 20px 30px',
    customNode: () => <RLNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <rect x="15" y="25" width="25" height="25" rx="4" fill="currentColor" className="opacity-20"/>
         <rect x="15" y="25" width="25" height="25" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
         <text x="27.5" y="42" fontSize="12" fill="currentColor" textAnchor="middle" fontWeight="bold">A</text>
         
         <circle cx="75" cy="37.5" r="14" fill="currentColor" className="opacity-20"/>
         <circle cx="75" cy="37.5" r="14" fill="none" stroke="currentColor" strokeWidth="2"/>
         <text x="75" y="42" fontSize="12" fill="currentColor" textAnchor="middle" fontWeight="bold">E</text>

         <path d="M 40 25 Q 50 15 60 25" fill="none" stroke="currentColor" strokeWidth="2"/>
         <polygon points="56,22 62,27 54,29" fill="currentColor"/>
         
         <path d="M 60 50 Q 50 60 40 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2"/>
         <polygon points="44,53 38,48 46,46" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 'autoreg', 
    label: 'Analyse Temporelle', 
    desc: 'Modélisation des séries temporelles (météo, bourse) où le futur dépend du passé.', 
    subTopics: ['ARIMA', 'Lissage Exponentiel', 'Prophet'],
    category: 'param', 
    color: 'border-[#82520c]', 
    text: 'text-white/90', 
    br: '30px 20px 30px 10px',
    customNode: () => <TimeSeriesNode />
  },
  { 
    id: 'genetic', 
    label: 'Algorithmes Évolutifs', 
    desc: 'Inspirés de Darwin : sélection, croisement et mutation pour optimiser des solutions expertes.', 
    subTopics: ['Algos Génétiques', 'Stratégies d\'Évolution', 'Swarm (PSO)'],
    category: 'param', 
    color: 'border-[#cc2323]', 
    text: 'text-white/90', 
    br: '20px 30px 30px 20px',
    customNode: () => <GeneticNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <path d="M20 20 C 40 20, 40 60, 60 60 L 80 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
         <path d="M20 60 C 40 60, 40 20, 60 20 L 80 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
         <circle cx="20" cy="20" r="3" fill="currentColor"/>
         <circle cx="20" cy="60" r="3" fill="currentColor"/>
         <circle cx="80" cy="20" r="3" fill="currentColor"/>
         <circle cx="80" cy="60" r="3" fill="currentColor"/>
         <line x1="40" y1="15" x2="40" y2="65" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1,2" />
         <line x1="50" y1="15" x2="50" y2="65" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1,2" />
      </svg>
    )
  },

  // Non-parametrique (Purple spectrum)
  { 
    id: 'trees', 
    label: 'Arbres de Décision', 
    desc: 'Segmentation hiérarchique de l\'espace basée sur l\'entropie ou l\'impureté de Gini.', 
    subTopics: ['Classification (CART)', 'Régression', 'Élagage (Pruning)'],
    category: 'nonparam', 
    color: 'border-[#6b35a1]', 
    text: 'text-white/90', 
    br: '40px 30px 20px 30px',
    customNode: () => <TreesNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <line x1="50" y1="20" x2="30" y2="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
         <line x1="50" y1="20" x2="70" y2="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
         <line x1="30" y1="45" x2="15" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
         <line x1="30" y1="45" x2="45" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
         <circle cx="50" cy="20" r="5" fill="currentColor"/>
         <circle cx="30" cy="45" r="5" fill="currentColor"/>
         <circle cx="70" cy="45" r="5" fill="currentColor"/>
         <circle cx="15" cy="70" r="4" fill="currentColor"/>
         <circle cx="45" cy="70" r="4" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 'ensemble', 
    label: 'Méthodes Ensemblistes', 
    desc: 'Combinaison de plusieurs modèles faibles (arbres) pour créer un modèle très robuste.', 
    subTopics: ['Random Forest (Bagging)', 'XGBoost / LightGBM (Boosting)', 'AdaBoost'],
    category: 'nonparam', 
    color: 'border-[#552487]', 
    text: 'text-white/90', 
    br: '25px 20px 30px 15px',
    customNode: () => <EnsembleNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <circle cx="25" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
         <circle cx="50" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
         <circle cx="75" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
         <path d="M25 47 Q 50 70 50 70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" fill="none"/>
         <path d="M50 47 Q 50 70 50 70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" fill="none"/>
         <path d="M75 47 Q 50 70 50 70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" fill="none"/>
         <circle cx="50" cy="70" r="6" fill="currentColor" />
      </svg>
    )
  },
  { 
    id: 'knn', 
    label: 'K-Plus Proches Voisins', 
    desc: 'Classification par observation des K voisins les plus proches (distance euclidienne).', 
    subTopics: ['Distance Euclidienne', 'Frontière non-linéaire', 'K-NN', 'Lazy Learning'],
    category: 'nonparam', 
    color: 'border-[#3b1763]', 
    text: 'text-white/90', 
    br: '20px 30px 15px 25px',
    customNode: () => <KNNNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <circle cx="50" cy="40" r="20" fill="currentColor" className="opacity-10"/>
         <circle cx="50" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3"/>
         <circle cx="50" cy="40" r="4" fill="currentColor"/>
         <path d="M50 40 L35 30" stroke="currentColor" strokeWidth="1"/>
         <path d="M50 40 L60 50" stroke="currentColor" strokeWidth="1"/>
         <path d="M50 40 L65 30" stroke="currentColor" strokeWidth="1"/>
         <circle cx="35" cy="30" r="3" fill="currentColor" className="opacity-60"/>
         <circle cx="60" cy="50" r="3" fill="currentColor" className="opacity-60"/>
         <circle cx="65" cy="30" r="3" fill="currentColor" className="opacity-60"/>
      </svg>
    )
  },
  { 
    id: 'svm', 
    label: 'Machines à Vecteurs de Support (SVM)', 
    desc: 'Maximisation de la séparation entre classes à l\'aide des vecteurs de support.', 
    subTopics: ['Marge Maximum', 'Classification Linéaire', 'Soft Margin (C)'],
    category: 'nonparam', 
    color: 'border-[#826918]', 
    text: 'text-white/90', 
    br: '15px 30px 20px 15px',
    customNode: () => <SVMNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <line x1="20" y1="80" x2="80" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
         <line x1="5" y1="65" x2="65" y2="-5" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3"/>
         <line x1="35" y1="95" x2="95" y2="25" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3"/>
         <circle cx="35" cy="30" r="3" fill="currentColor"/>
         <circle cx="45" cy="20" r="3" fill="currentColor"/>
         <circle cx="60" cy="65" r="3" fill="currentColor"/>
         <circle cx="75" cy="55" r="3" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 'kernel', 
    label: 'L\'Astuce du Noyau (Kernel Trick)', 
    desc: 'Projection des données dans un espace de plus grande dimension pour faciliter la séparation.', 
    subTopics: ['RBF Kernel', 'Polynomial Kernel', 'Produit Scalaire'],
    category: 'nonparam', 
    color: 'border-[#4f3880]', 
    text: 'text-white/90', 
    br: '30px 20px 30px 10px',
    customNode: () => <KernelNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <path d="M 10 50 Q 50 10 90 50 Q 50 90 10 50 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
         <path d="M 20 50 Q 50 -10 80 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
         <circle cx="50" cy="20" r="3" fill="currentColor"/>
         <circle cx="40" cy="30" r="3" fill="currentColor"/>
         <circle cx="60" cy="30" r="3" fill="currentColor"/>
         <line x1="50" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="1,2"/>
      </svg>
    )
  },
  { 
    id: 'clustering', 
    label: 'Clustering Non-Supervisé', 
    desc: 'Découverte automatique de groupes (clusters) cachés sans étiquettes préalables.', 
    subTopics: ['K-Means', 'DBSCAN', 'Clustering Hiérarchique'],
    category: 'nonparam', 
    color: 'border-[#292a59]', 
    text: 'text-white/90', 
    br: '15px 30px 20px 25px',
    customNode: () => <ClusteringNode />,
    illustration: () => (
      <svg viewBox="0 0 100 80" className="w-full h-full opacity-40">
         <circle cx="30" cy="30" r="18" fill="currentColor" className="opacity-10"/>
         <circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
         <circle cx="70" cy="55" r="16" fill="currentColor" className="opacity-10"/>
         <circle cx="70" cy="55" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
         <circle cx="30" cy="30" r="5" fill="currentColor" />
         <circle cx="20" cy="25" r="2.5" fill="currentColor" className="opacity-70"/>
         <circle cx="38" cy="35" r="2.5" fill="currentColor" className="opacity-70"/>
         <circle cx="70" cy="55" r="5" fill="currentColor" />
         <circle cx="65" cy="45" r="2.5" fill="currentColor" className="opacity-70"/>
         <circle cx="78" cy="62" r="2.5" fill="currentColor" className="opacity-70"/>
      </svg>
    )
  },
];

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportTotal, setExportTotal] = useState(0);

  const generateExportCanvases = async () => {
    const container = document.getElementById('export-container');
    if (!container) throw new Error("Container not found");

    const pixelRatio = 2; // High definition
    
    // We generate one large master canvas to be incredibly fast (1 pass instead of 19)
    const bigCanvas = await htmlToImage.toCanvas(container, {
      pixelRatio,
      backgroundColor: '#111',
    });

    const containerRect = container.getBoundingClientRect();
    const results: { canvas: HTMLCanvasElement, width: number, height: number, region: Region, index: number }[] = [];

    for (let i = 0; i < regions.length; i++) {
      const region = regions[i];
      const element = document.getElementById(`export-node-${region.id}`);
      if (!element) continue;

      const elRect = element.getBoundingClientRect();
      const x = (elRect.left - containerRect.left) * pixelRatio;
      const y = (elRect.top - containerRect.top) * pixelRatio;
      const w = elRect.width * pixelRatio;
      const h = elRect.height * pixelRatio;

      const smallCanvas = document.createElement('canvas');
      smallCanvas.width = w;
      smallCanvas.height = h;
      const ctx = smallCanvas.getContext('2d');
      if (ctx) {
         ctx.drawImage(bigCanvas, x, y, w, h, 0, 0, w, h);
         results.push({ canvas: smallCanvas, width: elRect.width, height: elRect.height, region, index: i });
      }
    }
    return results;
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    setExportTotal(regions.length);
    setExportProgress(1); // Starting generation...
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // wait for DOM to render the hidden container
      
      const canvases = await generateExportCanvases();
      let pdf: jsPDF | null = null;
      
      for (const res of canvases) {
          const pdfW = 1000;
          const pdfH = (res.height * pdfW) / res.width;
          
          if (!pdf) {
            pdf = new jsPDF({ orientation: pdfW > pdfH ? 'l' : 'p', unit: 'px', format: [pdfW, pdfH] });
          } else {
            pdf.addPage([pdfW, pdfH], pdfW > pdfH ? 'l' : 'p');
          }
          
          const dataUrl = res.canvas.toDataURL('image/jpeg', 0.9);
          pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfW, pdfH);
          setExportProgress(res.index + 1);
      }
      
      pdf?.save('Machine-Learning-Infographies-HD.pdf');

    } catch(e) {
      console.error(e);
      alert("Erreur lors de l'export PDF.");
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const handleExportPNG = async () => {
    setIsExporting(true);
    setExportTotal(regions.length);
    setExportProgress(1);
    
    try {
      const zip = new JSZip();
      await new Promise(resolve => setTimeout(resolve, 800)); // wait for DOM
      
      const canvases = await generateExportCanvases();
      
      for (const res of canvases) {
          const blob = await new Promise<Blob | null>(resolve => res.canvas.toBlob(resolve, 'image/png'));
          if (blob) {
            const safeName = res.region.label.replace(/[^a-zA-Z0-9_\-\u00C0-\u017F]/g, "_").replace(/_+/g, "_");
            zip.file(`${res.index + 1}_${safeName}.png`, blob);
          }
          setExportProgress(res.index + 1);
      }
      
      const content = await zip.generateAsync({type:"blob"});
      saveAs(content, "Machine_Learning_Infographies_HD.zip");

    } catch(e) {
      console.error(e);
      alert("Erreur lors de l'export PNG ZIP.");
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const categories = [
    { id: 'param', title: 'Modèles Paramétriques', color: 'text-[#edab7e]' },
    { id: 'nonparam', title: 'Modèles Non-Paramétriques', color: 'text-[#cbb0ed]' },
    { id: 'nn', title: 'Neural Networks (Deep Learning)', color: 'text-[#a6d1f0]' },
    { id: 'rl', title: 'Reinforcement Learning', color: 'text-[#f472b6]' }
  ];

  return (
    <div className="w-full flex justify-center py-6">
      {/* Export Container (Hidden visually but available in DOM for html-to-image) */}
      {isExporting && (
        <div className="fixed inset-0 bg-[#0f0f0f] z-[100] flex flex-col items-center justify-center text-white">
          <Loader2 className="w-16 h-16 animate-spin mb-6 text-blue-500" />
          <h2 className="text-2xl font-bold mb-2">Exportation en cours...</h2>
          <p className="text-white/60 mb-8">Génération des images haute définition ({exportProgress}/{exportTotal})</p>
          <div className="w-full max-w-md bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
              <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${(exportProgress / exportTotal) * 100}%` }} />
          </div>
          
          <div className="absolute top-[-9999px] left-[-9999px] w-[2600px] pointer-events-none p-10 flex flex-wrap gap-10 opacity-0" id="export-container" style={{ position: 'absolute' }}>
             {regions.map((region, i) => (
                <div key={region.id} id={`export-node-${region.id}`} className="bg-[#11f] w-[1100px] shrink-0 p-10 border border-white/20 rounded-3xl flex flex-col gap-8 relative overflow-hidden" style={{ minHeight: '800px', backgroundColor: '#111' }}>
                  
                  {/* Header */}
                  <div className="flex flex-col gap-4 z-10 w-full relative">
                    <div className="flex items-center gap-6">
                      <div className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center bg-white/5 border ${region.color}`} style={{ color: region.color.replace('border-', '') }}>
                        <div className="w-12 h-12">
                          {region.illustration && region.illustration()}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h1 className="text-5xl font-bold drop-shadow-md text-white">{region.label}</h1>
                        <p className="text-2xl text-white/70 max-w-4xl leading-relaxed">{region.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] rounded-3xl p-8 border border-white/5 shadow-2xl z-10 w-full overflow-hidden text-white relative">
                     {region.customNode && region.customNode()}
                  </div>
                </div>
             ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-[1400px] flex flex-col gap-4">
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 gap-4">
           <div>
             <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md">
               Tour d'horizon de l'IA
             </h1>
             <h2 className="text-sm md:text-base font-medium text-slate-400 mt-1 flex items-center gap-2">
               <MousePointer2 className="w-4 h-4" />
               Cliquez sur un domaine pour explorer
             </h2>
           </div>
           <div className="flex gap-2 shrink-0">
             <button 
               onClick={handleExportPNG} 
               disabled={isExporting}
               className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors border border-blue-400 text-sm font-medium"
             >
               {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
               {isExporting ? 'Exportation...' : 'Exporter PNG (HD)'}
             </button>
             <button 
               onClick={handleExportPDF} 
               disabled={isExporting}
               className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10 text-sm font-medium"
             >
               {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
               PDF
             </button>
           </div>
        </div>

        {/* Poster Map Wrapper - Grid Layout */}
        <div 
          ref={mapRef} 
          className="bg-[#111] w-full rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 p-4 md:p-8 text-white"
        >
           <div className="mb-12">
             <DSPipeline />
           </div>

           <div className="grid grid-cols-1 gap-12">
             {categories.map((cat, catIndex) => (
                <div key={cat.id} className="flex flex-col gap-6">
                  {/* Category Title */}
                  <div className={`text-2xl md:text-3xl font-hand opacity-90 drop-shadow-md pb-2 border-b border-white/10 ${cat.color}`}>
                    ■ {cat.title}
                  </div>

                  {/* Category Items */}
                  <div className="flex flex-col gap-4">
                    {regions.filter(r => r.category === cat.id).map((reg, i) => (
                      <div
                        key={reg.id}
                        className="flex flex-col w-full"
                      >
                        <div
                          className={`relative w-full bg-black overflow-hidden p-6 border-2 ${reg.color}`}
                          style={{ 
                            borderRadius: reg.br
                          }}
                        >
                           {/* SVG Background Illustration */}
                           {reg.illustration && (
                             <div className="absolute top-1/2 -translate-y-1/2 right-4 w-32 h-32 md:w-36 md:h-36 pointer-events-none z-0 opacity-60">
                               {reg.illustration()}
                             </div>
                           )}
                           
                           {/* Text Content */}
                           <div className="relative z-10 flex flex-col items-center text-center w-full h-full">
                              <span className={`font-hand font-bold text-2xl md:text-3xl whitespace-pre-wrap ${reg.text} drop-shadow-sm`}>
                                {reg.label}
                              </span>
                              {reg.desc && (
                                <span className={`font-sans font-medium text-sm md:text-base mt-2 whitespace-pre-wrap ${reg.text} opacity-90 leading-snug drop-shadow-sm max-w-2xl mx-auto`}>
                                  {reg.desc}
                                </span>
                              )}
                              
                              {/* Theory and App embedded directly inline */}
                              {(reg.theory || reg.app) && (
                                <div className="mt-6 flex flex-col gap-4 font-sans w-full">
                                  {reg.theory && (
                                    <div className={`mt-2 ${reg.text}`}>
                                      <h4 className={`text-[10px] sm:text-xs tracking-widest uppercase font-bold mb-2 flex items-center justify-center gap-2 ${reg.text}`}>
                                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        Concept Théorique
                                      </h4>
                                      <div className="text-sm leading-relaxed opacity-95 text-center">
                                        {reg.theory}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {reg.app && (
                                    <div className={`mt-2 ${reg.text}`}>
                                      <h4 className={`text-[10px] sm:text-xs tracking-widest uppercase font-bold mb-2 flex items-center justify-center gap-2 ${reg.text}`}>
                                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Cas Pratique
                                      </h4>
                                      <div className="text-sm leading-relaxed opacity-95 text-center">
                                        {reg.app}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {reg.customNode && (
                                <div className="mt-6 w-full">
                                  {reg.customNode()}
                                </div>
                              )}

                              {reg.subTopics && (
                                <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                                  {reg.subTopics.map((topic, tidx) => (
                                    <span key={tidx} className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full border border-current opacity-80 ${reg.text}`}>
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              )}
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}

