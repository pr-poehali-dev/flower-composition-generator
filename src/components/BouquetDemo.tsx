import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CircleFlower {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  type: 'focal' | 'secondary' | 'filler';
}

const BouquetDemo = () => {
  const [circles, setCircles] = useState<CircleFlower[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateBouquet = () => {
    setIsAnimating(true);
    const newCircles: CircleFlower[] = [];
    const centerX = 200;
    const centerY = 200;
    const maxRadius = 150;

    const colors = {
      focal: ['#FF6B9D', '#FFB4D1', '#FFA07A'],
      secondary: ['#DDA0DD', '#E6A8D7', '#F0C4E1'],
      filler: ['#98D8C8', '#B4E5D8', '#A8E6CF']
    };

    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5 + Math.random() * 0.3;
      const distance = 40 + Math.random() * 30;
      newCircles.push({
        id: Date.now() + i,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: 45 + Math.random() * 15,
        color: colors.focal[Math.floor(Math.random() * colors.focal.length)],
        type: 'focal'
      });
    }

    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 70 + Math.random() * 40;
      newCircles.push({
        id: Date.now() + 100 + i,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: 25 + Math.random() * 10,
        color: colors.secondary[Math.floor(Math.random() * colors.secondary.length)],
        type: 'secondary'
      });
    }

    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 90 + Math.random() * 60;
      if (distance <= maxRadius) {
        newCircles.push({
          id: Date.now() + 200 + i,
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: 12 + Math.random() * 8,
          color: colors.filler[Math.floor(Math.random() * colors.filler.length)],
          type: 'filler'
        });
      }
    }

    setCircles(newCircles);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    generateBouquet();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Интерактивная визуализация</h3>
          <p className="text-muted-foreground">
            Кружочки символизируют цветы в букете: крупные — фокальные, средние — второстепенные, мелкие — наполнители
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-[400px] h-[400px] bg-gradient-to-br from-floral-lavender/20 to-floral-pink/20 rounded-full flex items-center justify-center">
            <svg width="400" height="400" className="absolute inset-0">
              {circles.map((circle, index) => (
                <circle
                  key={circle.id}
                  cx={circle.x}
                  cy={circle.y}
                  r={circle.size}
                  fill={circle.color}
                  className="transition-all duration-500"
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'scale(0)' : 'scale(1)',
                    transformOrigin: `${circle.x}px ${circle.y}px`,
                    animationDelay: `${index * 30}ms`
                  }}
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={generateBouquet} size="lg" className="gap-2">
            <Icon name="RefreshCw" size={18} />
            Создать новую композицию
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-floral-pink/20 rounded-lg">
            <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ backgroundColor: '#FF6B9D' }} />
            <p className="font-semibold">Фокальные</p>
            <p className="text-sm text-muted-foreground">Крупные бутоны</p>
          </div>
          <div className="text-center p-4 bg-floral-lavender/20 rounded-lg">
            <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: '#DDA0DD' }} />
            <p className="font-semibold">Второстепенные</p>
            <p className="text-sm text-muted-foreground">Средние цветки</p>
          </div>
          <div className="text-center p-4 bg-floral-green/20 rounded-lg">
            <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: '#98D8C8' }} />
            <p className="font-semibold">Наполнители</p>
            <p className="text-sm text-muted-foreground">Декор и зелень</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BouquetDemo;
