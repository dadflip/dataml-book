import React from 'react';
import LinearRegression from './linear/LinearRegression';
import LogisticRegression from './linear/LogisticRegression';
import PolynomialRegression from './linear/PolynomialRegression';
import Regularization from './linear/Regularization';
import LinearMath from './math/LinearMath';

export default function LinearNode() {
  return (
    <div className="flex flex-col gap-10 mt-6 text-white max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LinearRegression />
        <LogisticRegression />
        <PolynomialRegression />
      </div>
      <Regularization />
      <LinearMath />
    </div>
  );
}
