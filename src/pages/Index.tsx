import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import BouquetConstructor from '@/components/BouquetConstructor';
import BouquetDemo from '@/components/BouquetDemo';
import BouquetGallery from '@/components/BouquetGallery';

const Index = () => {
  const [activeTab, setActiveTab] = useState('demo');

  return (
    <div className="min-h-screen bg-gradient-to-br from-floral-lavender via-white to-floral-pink">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl">🌸</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Цветник</h1>
            </div>
            <Badge variant="secondary" className="text-sm font-normal">
              AI-конструктор букетов
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 text-foreground">
            Создай идеальный букет с помощью AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выбирай цветы, декор и цветовую палитру — AI создаст композицию по профессиональным флористическим алгоритмам
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="demo" className="flex items-center gap-2">
              <Icon name="Sparkles" size={16} />
              Демо
            </TabsTrigger>
            <TabsTrigger value="constructor" className="flex items-center gap-2">
              <Icon name="Wand2" size={16} />
              Конструктор
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Icon name="Images" size={16} />
              Галерея
            </TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="animate-fade-in">
            <BouquetDemo />
          </TabsContent>

          <TabsContent value="constructor" className="animate-fade-in">
            <BouquetConstructor />
          </TabsContent>

          <TabsContent value="gallery" className="animate-fade-in">
            <BouquetGallery />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-20 py-8 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Цветник — AI-конструктор флористических композиций</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
