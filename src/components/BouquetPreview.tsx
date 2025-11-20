import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { SelectedFlower } from './BouquetConstructor';

interface BouquetScheme {
  id: number;
  flowers: SelectedFlower[];
  pattern: string;
}

interface BouquetPreviewProps {
  schemes: BouquetScheme[];
  selectedScheme: number | null;
  onSelectScheme: (id: number) => void;
}

interface CirclePosition {
  x: number;
  y: number;
  size: number;
  color: string;
  flower: SelectedFlower;
}

const BouquetPreview = ({ schemes, selectedScheme, onSelectScheme }: BouquetPreviewProps) => {
  const [generatingImage, setGeneratingImage] = useState(false);

  const generateCircleLayout = (flowers: SelectedFlower[], schemeId: number): CirclePosition[] => {
    const circles: CirclePosition[] = [];
    const centerX = 200;
    const centerY = 200;
    const maxRadius = 180;

    const seed = schemeId * 123;
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };

    let circleIndex = 0;

    const focalFlowers = flowers.filter(f => f.type === 'focal');
    const focalTotal = focalFlowers.reduce((sum, f) => sum + f.count, 0);
    
    focalFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const angle = (Math.PI * 2 * circleIndex) / focalTotal + seededRandom(circleIndex) * 0.4;
        const distance = 30 + seededRandom(circleIndex + 100) * 25;
        circles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: 40 + seededRandom(circleIndex + 200) * 15,
          color: flower.color,
          flower
        });
        circleIndex++;
      }
    });

    const secondaryFlowers = flowers.filter(f => f.type === 'secondary');
    const secondaryTotal = secondaryFlowers.reduce((sum, f) => sum + f.count, 0);
    
    secondaryFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const angle = (Math.PI * 2 * circleIndex) / secondaryTotal + seededRandom(circleIndex + 300) * 0.5;
        const distance = 70 + seededRandom(circleIndex + 400) * 35;
        circles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: 25 + seededRandom(circleIndex + 500) * 12,
          color: flower.color,
          flower
        });
        circleIndex++;
      }
    });

    const fillerFlowers = flowers.filter(f => f.type === 'filler');
    fillerFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const angle = seededRandom(circleIndex + 600) * Math.PI * 2;
        const distance = 100 + seededRandom(circleIndex + 700) * 80;
        if (distance <= maxRadius) {
          circles.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            size: 10 + seededRandom(circleIndex + 800) * 8,
            color: flower.color,
            flower
          });
        }
        circleIndex++;
      }
    });

    return circles;
  };

  const handleGenerateFinalImage = () => {
    setGeneratingImage(true);
    setTimeout(() => {
      setGeneratingImage(false);
      alert('Функция генерации реалистичного фото будет доступна после интеграции с AI-моделью генерации изображений');
    }, 1500);
  };

  return (
    <Card className="p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Варианты композиций</h3>
        <p className="text-muted-foreground">
          AI создал {schemes.length} варианта букета по флористическим алгоритмам
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {schemes.map((scheme) => {
          const circles = generateCircleLayout(scheme.flowers, scheme.id);
          const isSelected = selectedScheme === scheme.id;

          return (
            <div
              key={scheme.id}
              className={`cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-primary scale-105' : 'hover:scale-102'
              }`}
              onClick={() => onSelectScheme(scheme.id)}
            >
              <Card className="p-4">
                <div className="mb-3">
                  <div className="w-full aspect-square bg-gradient-to-br from-floral-lavender/20 to-floral-pink/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
                      {circles.map((circle, index) => (
                        <circle
                          key={index}
                          cx={circle.x}
                          cy={circle.y}
                          r={circle.size}
                          fill={circle.color}
                          className="transition-transform hover:scale-110"
                          opacity={0.95}
                        >
                          <title>{circle.flower.name}</title>
                        </circle>
                      ))}
                    </svg>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant={isSelected ? 'default' : 'secondary'}>
                    Схема {scheme.id + 1}
                  </Badge>
                  {isSelected && (
                    <Icon name="Check" size={18} className="text-primary" />
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {selectedScheme !== null && (
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-floral-green/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Выбрана схема {selectedScheme + 1}</p>
            <div className="flex gap-2 justify-center text-xs">
              {schemes[selectedScheme].flowers.map((flower, index) => (
                <Badge key={index} variant="outline">
                  {flower.count}× {flower.name}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            className="gap-2"
            onClick={handleGenerateFinalImage}
            disabled={generatingImage}
          >
            {generatingImage ? (
              <>
                <Icon name="Loader2" size={18} className="animate-spin" />
                Генерация изображения...
              </>
            ) : (
              <>
                <Icon name="Camera" size={18} />
                Сгенерировать фото букета
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            AI создаст реалистичное фото букета по выбранной схеме
          </p>
        </div>
      )}
    </Card>
  );
};

export default BouquetPreview;
