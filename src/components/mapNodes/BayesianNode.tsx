import React from 'react';
import BayesTheorem from './bayesian/BayesTheorem';
import NaiveBayes from './bayesian/NaiveBayes';
import GaussianProcess from './bayesian/GaussianProcess';
import BayesianRegression from './bayesian/BayesianRegression';
import BayesianNetwork from './bayesian/BayesianNetwork';
import BayesianMath from './math/BayesianMath';

export default function BayesianNode() {
  return (
    <div className="flex flex-col gap-10 mt-6 text-white max-w-7xl mx-auto">
      <BayesTheorem />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <NaiveBayes />
        <GaussianProcess />
        <BayesianRegression />
        <BayesianNetwork />
      </div>
      <BayesianMath />
    </div>
  );
}
