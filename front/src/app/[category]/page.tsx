import React from 'react';
import Body from '@/components/Body';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  return (
    <React.Suspense fallback={null}>
      <CategoryPageContent params={params} />
    </React.Suspense>
  );
}

function CategoryPageContent({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = React.use(params);

  return <Body category={resolvedParams.category} />;
}
