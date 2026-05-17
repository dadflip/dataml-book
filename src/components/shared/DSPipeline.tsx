import React, { useState } from 'react';


export default function DSPipeline() {
  const [activeType, setActiveType] = useState<'tabular' | 'image' | 'text' | 'graph' | 'rl'>('tabular');

  let title = "";
  let code = ``;
  let steps: any[] = [];

  if (activeType === 'tabular') {
    title = "Classique Tabulaire (Scikit-Learn)";
    code = `import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, mean_squared_error

# 1. Chargement des données (Data Loading)
df = pd.read_csv('dataset.csv')
X = df.drop('target', axis=1)
y = df['target']

# 2. Preprocessing : Nettoyage, Imputation et Encodage
num_features = X.select_dtypes(include=['int64', 'float64']).columns
cat_features = X.select_dtypes(include=['object']).columns

num_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')), # Gère les valeurs manquantes
    ('scaler', StandardScaler()) # Normalisation (Moyenne 0, Ecart-type 1)
])

cat_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('onehot', OneHotEncoder(handle_unknown='ignore')) # Variables catégorielles
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', num_transformer, num_features),
        ('cat', cat_transformer, cat_features)
    ])

# 3. Split (Train / Test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Pipeline Final (Avec un modèle fictif)
from sklearn.dummy import DummyClassifier # Remplacez par le VRAI modèle
pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                           ('classifier', DummyClassifier())])

# 5. Fine-Tuning (Recherche d'hyperparamètres)
param_grid = { 'classifier__strategy': ['most_frequent', 'prior'] }
grid_search = GridSearchCV(pipeline, param_grid, cv=5) # Cross-Validation = 5

# 6. Entraînement (Training)
grid_search.fit(X_train, y_train)

# 7. Évaluation et Déploiement
y_pred = grid_search.predict(X_test)
print(classification_report(y_test, y_pred))`;
    steps = [
      { name: "1. Data Loading", desc: "pd.read_csv()" },
      { name: "2. Preprocessing", desc: "Imputing, Scaling, Encoding" },
      { name: "3. Split", desc: "Train (80%) / Test (20%)" },
      { name: "4. Modeling", desc: "Pipeline(Modèle)" },
      { name: "5. Fine-Tuning", desc: "GridSearchCV (Cross-Valid)" },
      { name: "6. Evaluation", desc: "Metrics (F1, MSE...)" }
    ];
  } else if (activeType === 'image') {
    title = "Vision par Ordinateur (Deep Learning)";
    code = `import torch
import torchvision.transforms as transforms
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
import torch.nn as nn
import torch.optim as optim

# 1. Preprocessing (Transformations et Augmentation)
transform_train = transforms.Compose([
    transforms.RandomResizedCrop(224), # Augmentation: recadrage aléatoire
    transforms.RandomHorizontalFlip(), # Augmentation: miroir
    transforms.ToTensor(), # Conversion en Tenseur Pytorch [0,1]
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]) # Normalisation
])

transform_test = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# 2. Chargement des données (Data Loading)
train_dataset = ImageFolder(root='data/train', transform=transform_train)
test_dataset = ImageFolder(root='data/test', transform=transform_test)

# Batches, Shuffling & Multi-processing (Workers)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True, num_workers=4)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False, num_workers=4)

# 3. Modèle (Instanciation de l'architecture)
model = nn.Linear(224*224*3, 10) # Placeholder pour le VRAI Modèle (ex: CNN)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

# 4. Définition de l'Optimiseur et du Coût (Loss)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 5. Boucle d'entraînement (Training Loop)
num_epochs = 10
for epoch in range(num_epochs):
    model.train() # Mode entraînement (active le Dropout/BatchNorm)
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        
        # Forward pass
        outputs = model(images)
        loss = criterion(outputs, labels)
        
        # Backward pass et Optimisation (Gradient Descent)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

# 6. Evaluation
model.eval() # Mode évaluation (désactive Dropout)
correct = 0
total = 0
with torch.no_grad(): # Pas de calcul de gradients
    for images, labels in test_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

print(f'Accuracy: {100 * correct / total}%')`;
    steps = [
      { name: "1. Transformations", desc: "Resize, Augmentation, Tensors" },
      { name: "2. DataLoader", desc: "Batching, Shuffling, GPU Memory" },
      { name: "3. Model & Optim", desc: "Architecture, Adam, Loss" },
      { name: "4. Training Loop", desc: "Forward, Backward, Optimizer.step" },
      { name: "5. Evaluation", desc: "torch.no_grad(), Metrics" }
    ];
  } else if (activeType === 'text') {
    title = "NLP & Transformers (LLMs)";
    code = `from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import TrainingArguments, Trainer
import torch

# 1. Chargement du dataset (ex: HuggingFace Datasets)
dataset = load_dataset("imdb")

# 2. Tokenization (Conversion Texte -> Nombres)
model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)

def tokenize_function(examples):
    # Padding, Truncation et création des Tensors (PyTorch)
    return tokenizer(examples["text"], padding="max_length", truncation=True, max_length=128)

# Application de la tokenization (Map function rapide)
tokenized_datasets = dataset.map(tokenize_function, batched=True)

# 3. Modèle (Architecture Pré-entraînée - Transfer Learning)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)

# 4. Configuration de l'entraînement (Hyperparamètres)
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch", # Cross-validation à chaque Epoch
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01, # Régularisation
)

# 5. Entraînement via le Trainer (Gère la boucle d'entrainement abstraite)
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],
)

trainer.train()

# 6. Evaluation / Inférence
trainer.evaluate()

text = "This movie was incredibly impressive!"
inputs = tokenizer(text, return_tensors="pt").to(model.device)
with torch.no_grad():
    logits = model(**inputs).logits
    predicted_class = logits.argmax().item()
print(f"Prediction: {predicted_class}")`;
    steps = [
      { name: "1. Dataset", desc: "HuggingFace Datasets API" },
      { name: "2. Tokenization", desc: "BPE/WordPiece, Truncation, Padding" },
      { name: "3. Model Definition", desc: "Pre-trained Weights + Head" },
      { name: "4. Trainer Setup", desc: "Hyperparams, Scheduler" },
      { name: "5. Fine-Tuning", desc: "Trainer API" },
      { name: "6. Inference", desc: "Logits to Probabilities" }
    ];
  } else if (activeType === 'graph') {
    title = "Graph Neural Networks (GNN)";
    code = `import torch
from torch_geometric.datasets import Planetoid
from torch_geometric.nn import GCNConv # Placeholder Node, le VRAI modèle utilisera GAT/GraphSAGE
import torch.nn.functional as F

# 1. Chargement du graphe (PyTorch Geometric)
# dataset.data contient x (features), edge_index (arêtes), y (labels)
dataset = Planetoid(root='/tmp/Cora', name='Cora')
data = dataset[0]

# 2. Modèle GNN de Base (Graph Convolution)
class PlaceholderGNN(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = GCNConv(dataset.num_node_features, 16)
        self.conv2 = GCNConv(16, dataset.num_classes)

    def forward(self, data):
        x, edge_index = data.x, data.edge_index
        
        # Message Passing (Convolution sur le Graphe)
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = F.dropout(x, training=self.training)
        
        # Output layer
        x = self.conv2(x, edge_index)
        return F.log_softmax(x, dim=1)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = PlaceholderGNN().to(device)
data = data.to(device)

optimizer = torch.optim.Adam(model.parameters(), lr=0.01, weight_decay=5e-4)

# 3. Entraînement (Node Classification)
# Pas de batches si le graphe est unique ! On utilise un masque binaire.
model.train()
for epoch in range(200):
    optimizer.zero_grad()
    out = model(data)
    # On calcule la loss uniquement sur les noeuds d'entraînement
    loss = F.nll_loss(out[data.train_mask], data.y[data.train_mask])
    loss.backward()
    optimizer.step()

# 4. Evaluation
model.eval()
_, pred = model(data).max(dim=1)
correct = int(pred[data.test_mask].eq(data.y[data.test_mask]).sum().item())
acc = correct / int(data.test_mask.sum())
print(f'Accuracy: {acc:.4f}')`;
    steps = [
      { name: "1. Data Graph", desc: "Features (x), Connexions (edge_index)" },
      { name: "2. GNN Layers", desc: "Message Passing (Conv)" },
      { name: "3. Masking", desc: "Train/Test Split Masks pour 1 seul graphe" },
      { name: "4. Training", desc: "Optimisation sur les Training Nodes" },
      { name: "5. Evaluation", desc: "Metrics sur les Test Nodes" }
    ];
  } else if (activeType === 'rl') {
    title = "Reinforcement Learning (RL)";
    code = `import gym
import numpy as np
from stable_baselines3 import PPO # Placeholder, on utilise la lib Stable Baselines
from stable_baselines3.common.evaluation import evaluate_policy

# 1. Définition de l'Environnement (Gymnasium)
# Espace d'Actions (Discret/Continu) & Espace d'États (Observations)
env = gym.make('CartPole-v1')

# 2. Instanciation du Modèle (Agent RL)
# PPO (Proximal Policy Optimization) - Algorithme State-of-the-art
model = PPO('MlpPolicy', env, verbose=1, learning_rate=0.0003)

# 3. Entraînement (Exploration vs Exploitation)
# L'agent joue des épisodes pour maximiser sa Reward
model.learn(total_timesteps=10000)

# 4. Evaluation (Politique apprise)
# On teste l'agent sur 10 épisodes déterministes
mean_reward, std_reward = evaluate_policy(model, env, n_eval_episodes=10)
print(f"Mean reward: {mean_reward} +/- {std_reward}")

# 5. Inférence (Boucle d'Interaction temps réel)
obs = env.reset()
for i in range(1000):
    # L'agent prédit la meilleure action en fonction de l'environnement (observation)
    action, _states = model.predict(obs, deterministic=True)
    
    # L'environnement s'actualise
    obs, reward, done, info = env.step(action)
    env.render()
    if done:
      obs = env.reset()
      
env.close()`;
    steps = [
      { name: "1. Environment", desc: "Gymnasium (State, Action, Reward)" },
      { name: "2. Agent Logic", desc: "Algorithm Instantiation (e.g., PPO)" },
      { name: "3. Learn Loop", desc: "Episodes & Timesteps (Exploration)" },
      { name: "4. Policy Eval", desc: "Testing average rewards without exploration" },
      { name: "5. Inference run", desc: "Predict Action -> Step Env -> State" }
    ];
  }

  const tabs = [
    { id: 'tabular', label: 'Tabulaire (Classique)' },
    { id: 'image', label: 'Image (Vision)' },
    { id: 'text', label: 'Texte (NLP)' },
    { id: 'graph', label: 'Graphes (GNN)' },
    { id: 'rl', label: 'Apprentissage par Renf.' },
  ] as const;

  return (
    <div className="flex flex-col gap-6 bg-white/[0.02] border border-violet-500/10 rounded-2xl p-6 md:p-8">
      
      <div className="flex flex-col gap-6 border-b border-white/5 pb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 sm:p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg md:text-xl text-white tracking-tight">Templates de Pipelines standards</h3>
              <p className="text-xs md:text-sm text-white/50 mt-1">Squelette d'un projet MLOps/Data Science selon la nature des données</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
           {tabs.map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveType(tab.id as any)}
               className={`min-w-fit px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeType === tab.id ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'bg-white/5 text-white/50 border border-transparent hover:bg-white/10 hover:text-white/80'}`}
             >
               {tab.label}
             </button>
           ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h4 className="font-bold text-white/90">{title}</h4>
        
        {/* Visual Pipeline Steps */}
        <div className="relative mt-2 mb-2">
          <div className="grid grid-cols-2 lg:flex lg:flex-row gap-4 relative z-10 w-full overflow-x-auto pb-4 hide-scrollbar">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col gap-3 min-w-[140px] flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                     <span className="text-[10px] font-mono text-violet-300 font-bold">{idx + 1}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="flex-1 border-t border-dashed border-white/10 hidden lg:block"></div>
                  )}
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#111111] border border-white/5 hover:border-violet-500/30 transition-all group h-full">
                  <span className="font-bold text-xs text-white/90 group-hover:text-violet-300 uppercase tracking-wider">{step.name.replace(/^\d+\.\s*/, '')}</span>
                  <span className="text-[10px] text-white/40 leading-relaxed font-mono">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}
