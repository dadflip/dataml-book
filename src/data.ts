import { Section } from './types';
import { 
  TransformerSVG, 
  MLPSVG, 
  CNNSVG, 
  RNNSVG, 
  AutoencoderSVG,
  GNNSVG
} from './components/svgs/NeuralNets';
import {
  LinearRegressionSVG,
  BayesianSVG,
  DimensionReductionSVG,
  AutoregressionSVG
} from './components/svgs/ParametricML';
import {
  DecisionTreeSVG,
  EnsembleSVG,
  KNNSVG,
  SVMSVG
} from './components/svgs/NonParametricML';
import {
  GANSVG,
  GeneticSVG
} from './components/svgs/ReinforcementLearning';
import {
  KMeansSVG,
  DensityClusteringSVG,
  MetricsSVG
} from './components/svgs/Clustering';

export const sections: Section[] = [
  {
    id: 'nn',
    title: '1. Neural Networks',
    glowColor: 'bg-blue-500',
    colSpan: 1,
    subsections: [
      {
        id: '1.1',
        title: 'Transformers (2017)',
        description: 'Encodeur / Décodeur, Multi-Head Self-Attention, Feed-Forward Network, Add & Norm. -> GPT, BERT, T5, LLaMA, ViT',
        illustration: TransformerSVG,
      },
      {
        id: '1.2',
        title: 'ANN — Réseau dense (MLP)',
        description: 'Perceptron multicouche, backprop, fonctions d\'activation (ReLU, Sigmoid), optimiseurs (Adam), régularisation.',
        illustration: MLPSVG,
      },
      {
        id: '1.3',
        title: 'CNN — Réseaux convolutifs',
        description: 'Conv2D, Pooling, Flatten, FC, Softmax. -> ResNet, VGG, YOLO.',
        illustration: CNNSVG,
      },
      {
        id: '1.4',
        title: 'RNN — Réseaux récurrents',
        description: 'Cellules récurrentes, vanishing gradient. -> LSTM, GRU, Seq2Seq.',
        illustration: RNNSVG,
      },
      {
        id: '1.5',
        title: 'Auto-Encodeurs',
        description: 'Encodeur -> Espace latent -> Décodeur. Compression et génération. -> VAE, Sparse AE.',
        illustration: AutoencoderSVG,
      },
      {
        id: '1.6',
        title: 'GNN — Graph Neural Networks',
        description: 'Message Passing, convolutions sur graphes (Nœuds, Arêtes). -> GCN, GraphSAGE, GAT.',
        illustration: GNNSVG,
      }
    ]
  },
  {
    id: 'param',
    title: '2. ML — Paramétrique',
    glowColor: 'bg-amber-500',
    colSpan: 1,
    subsections: [
      {
        id: '2.2',
        title: 'Linear Models',
        description: 'Régression linéaire, logistique. Régularisation Ridge, Lasso, ElasticNet.',
        illustration: LinearRegressionSVG,
        detailId: 'linear-models'
      },
      {
        id: '2.3',
        title: 'Bayesian Models',
        description: 'Prior -> Likelihood -> Posterior. Naive Bayes, Gaussian Process.',
        illustration: BayesianSVG,
        detailId: 'bayesian-models'
      },
      {
        id: '2.4',
        title: 'Réduction de dimension',
        description: 'Projection haute dim -> basse dim. PCA, t-SNE, UMAP.',
        illustration: DimensionReductionSVG,
        detailId: 'dimension-reduction',
      },
      {
        id: '2.5',
        title: 'Autoregression',
        description: 'AR(p), MA(q), ARIMA, SARIMA. Modèles pour séries temporelles.',
        illustration: AutoregressionSVG,
        detailId: 'autoregression'
      }
    ]
  },
  {
    id: 'non-param',
    title: '3. ML — Non-Paramétrique',
    glowColor: 'bg-purple-500',
    colSpan: 1,
    subsections: [
      {
        id: '3.1',
        title: 'Trees',
        description: 'Arbres de décision, split Gini/Entropie. CART, ID3.',
        illustration: DecisionTreeSVG,
        detailId: 'non-parametric'
      },
      {
        id: '3.2',
        title: 'Ensemblistes',
        description: 'Bagging, Boosting, Stacking. Random Forest, XGBoost, LightGBM.',
        illustration: EnsembleSVG,
        detailId: 'non-parametric'
      },
      {
        id: '3.3',
        title: 'Nearest Neighbors',
        description: 'Vote des K voisins. Distances : Euclidienne, Cosinus.',
        illustration: KNNSVG,
        detailId: 'non-parametric'
      },
      {
        id: '3.4',
        title: 'SVM & Kernel',
        description: 'Hyperplan à marge maximale, vecteurs de support, Kernel Trick.',
        illustration: SVMSVG,
        detailId: 'non-parametric'
      }
    ]
  },
  {
    id: 'rl',
    title: '4. Reinforcement Learning / GenAI',
    glowColor: 'bg-pink-500',
    colSpan: 2,
    subsections: [
      {
        id: '4.1',
        title: 'GANs & Diffusion',
        description: 'Générateur vs Discriminateur, diffusion progressive x_T -> x_0.',
        illustration: GANSVG,
      },
      {
        id: '4.2',
        title: 'Génétiques / Évolutionnaires',
        description: 'Population, Sélection, Croisement, Mutation. Fitness landscape.',
        illustration: GeneticSVG,
      }
    ]
  },
  {
    id: 'clustering',
    title: '5. Clustering',
    glowColor: 'bg-orange-500',
    colSpan: 2,
    subsections: [
      {
        id: '5.1',
        title: 'K-Means & GMM',
        description: 'Centroïdes, frontières de Voronoï. Modèles de mélanges gaussiens.',
        illustration: KMeansSVG,
      },
      {
        id: '5.2',
        title: 'Clustering par densité',
        description: 'DBSCAN, HDBSCAN, Spectral Clustering, Mean-Shift.',
        illustration: DensityClusteringSVG,
      },
      {
        id: '5.3',
        title: 'Métriques',
        description: 'Silhouette score, Davies-Bouldin, inertie intra-cluster.',
        illustration: MetricsSVG,
      }
    ]
  }
];
