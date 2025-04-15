
import React from 'react';
import Header from '@/components/Header';
import StoryGenerator from '@/components/StoryGenerator';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <StoryGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
