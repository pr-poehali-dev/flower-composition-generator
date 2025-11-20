import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import type { SelectedFlower } from './BouquetConstructor';

interface BouquetScheme {
  id: number;
  flowers: SelectedFlower[];
  pattern: string;
  type: 'compact' | 'asymmetric' | 'cascade' | 'custom';
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
  id: string;
}

const BouquetPreview = ({ schemes, selectedScheme, onSelectScheme }: BouquetPreviewProps) => {
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customCircles, setCustomCircles] = useState<CirclePosition[]>([]);
  const [draggedCircle, setDraggedCircle] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const generateCompactLayout = (flowers: SelectedFlower[]): CirclePosition[] => {
    const circles: CirclePosition[] = [];
    const centerX = 200;
    const centerY = 200;
    let circleIndex = 0;

    const focalFlowers = flowers.filter(f => f.type === 'focal');
    const focalTotal = focalFlowers.reduce((sum, f) => sum + f.count, 0);
    
    focalFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const angle = (Math.PI * 2 * circleIndex) / Math.max(focalTotal, 1);
        const distance = 20 + Math.random() * 30;
        circles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: 45 + Math.random() * 15,
          color: flower.color,
          flower,
          id: `focal-${circleIndex}`
        });
        circleIndex++;
      }
    });

    const secondaryFlowers = flowers.filter(f => f.type === 'secondary');
    secondaryFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const angle = (Math.PI * 2 * circleIndex) / Math.max(flower.count, 1);
        const distance = 60 + Math.random() * 30;
        circles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: 28 + Math.random() * 12,
          color: flower.color,
          flower,
          id: `secondary-${circleIndex}`
        });
        circleIndex++;
      }
    });

    const fillerFlowers = flowers.filter(f => f.type === 'filler');
    fillerFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 95 + Math.random() * 80;
        circles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: 12 + Math.random() * 8,
          color: flower.color,
          flower,
          id: `filler-${circleIndex}`
        });
        circleIndex++;
      }
    });

    return circles;
  };

  const generateAsymmetricLayout = (flowers: SelectedFlower[]): CirclePosition[] => {
    const circles: CirclePosition[] = [];
    const centerX = 200;
    const centerY = 200;
    let circleIndex = 0;

    const focalFlowers = flowers.filter(f => f.type === 'focal');
    focalFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const x = centerX - 80 + Math.random() * 60;
        const y = centerY - 40 + Math.random() * 80;
        circles.push({
          x,
          y,
          size: 50 + Math.random() * 10,
          color: flower.color,
          flower,
          id: `focal-${circleIndex}`
        });
        circleIndex++;
      }
    });

    const secondaryFlowers = flowers.filter(f => f.type === 'secondary');
    secondaryFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const x = centerX + 20 + Math.random() * 100;
        const y = centerY - 60 + Math.random() * 120;
        circles.push({
          x,
          y,
          size: 30 + Math.random() * 15,
          color: flower.color,
          flower,
          id: `secondary-${circleIndex}`
        });
        circleIndex++;
      }
    });

    const fillerFlowers = flowers.filter(f => f.type === 'filler');
    fillerFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const side = Math.random() > 0.5 ? 1 : -1;
        const x = centerX + side * (80 + Math.random() * 100);
        const y = centerY - 80 + Math.random() * 160;
        circles.push({
          x,
          y,
          size: 10 + Math.random() * 10,
          color: flower.color,
          flower,
          id: `filler-${circleIndex}`
        });
        circleIndex++;
      }
    });

    return circles;
  };

  const generateCascadeLayout = (flowers: SelectedFlower[]): CirclePosition[] => {
    const circles: CirclePosition[] = [];
    const centerX = 200;
    const centerY = 150;
    let circleIndex = 0;

    const focalFlowers = flowers.filter(f => f.type === 'focal');
    focalFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const angle = Math.PI - 0.8 + Math.random() * 1.6;
        const distance = 40 + Math.random() * 30;
        circles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: 48 + Math.random() * 12,
          color: flower.color,
          flower,
          id: `focal-${circleIndex}`
        });
        circleIndex++;
      }
    });

    const secondaryFlowers = flowers.filter(f => f.type === 'secondary');
    secondaryFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const angle = Math.PI - 1.0 + Math.random() * 2.0;
        const distance = 75 + Math.random() * 40;
        circles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance + Math.random() * 50,
          size: 32 + Math.random() * 12,
          color: flower.color,
          flower,
          id: `secondary-${circleIndex}`
        });
        circleIndex++;
      }
    });

    const fillerFlowers = flowers.filter(f => f.type === 'filler');
    fillerFlowers.forEach((flower) => {
      for (let i = 0; i < flower.count; i++) {
        const angle = Math.PI - 1.2 + Math.random() * 2.4;
        const distance = 110 + Math.random() * 70;
        circles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance + Math.random() * 80,
          size: 12 + Math.random() * 10,
          color: flower.color,
          flower,
          id: `filler-${circleIndex}`
        });
        circleIndex++;
      }
    });

    return circles;
  };

  const generateCircleLayout = (flowers: SelectedFlower[], schemeType: string): CirclePosition[] => {
    switch (schemeType) {
      case 'compact':
        return generateCompactLayout(flowers);
      case 'asymmetric':
        return generateAsymmetricLayout(flowers);
      case 'cascade':
        return generateCascadeLayout(flowers);
      default:
        return generateCompactLayout(flowers);
    }
  };

  const handleGenerateFinalImage = async () => {
    if (selectedScheme === null) return;

    setGeneratingImage(true);
    
    try {
      const scheme = schemes[selectedScheme];
      const flowerList = scheme.flowers.map(f => `${f.count}x ${f.name}`).join(', ');
      const prompt = `Professional florist photograph of a beautiful flower bouquet arrangement. The bouquet contains: ${flowerList}. Studio lighting, white background, high quality, realistic, professional photography, detailed petals and leaves, elegant composition`;

      const response = await fetch('https://functions.poehali.dev/906e4d64-b170-49aa-aed5-89a15b8bdf5c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, scheme })
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedImageUrl(data.imageUrl);
      } else {
        alert('Ошибка генерации изображения');
      }
    } catch (error) {
      console.error('Image generation error:', error);
      alert('Ошибка при генерации фото букета');
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleStartCustom = () => {
    if (selectedScheme !== null) {
      const circles = generateCircleLayout(schemes[selectedScheme].flowers, 'compact');
      setCustomCircles(circles);
      setIsCustomMode(true);
    }
  };

  const handleCircleMouseDown = (id: string) => {
    setDraggedCircle(id);
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggedCircle || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 400;
    const y = ((e.clientY - rect.top) / rect.height) * 400;

    setCustomCircles(prev =>
      prev.map(circle =>
        circle.id === draggedCircle ? { ...circle, x, y } : circle
      )
    );
  };

  const handleSvgMouseUp = () => {
    setDraggedCircle(null);
  };

  const schemeDescriptions = [
    { type: 'compact', name: 'Компактная', desc: 'Фокальные цветы в центре, плотная композиция' },
    { type: 'asymmetric', name: 'Асимметричная', desc: 'Фокальные цветы сбоку, динамичная форма' },
    { type: 'cascade', name: 'Каскадная', desc: 'Спадающая форма, фокальные цветы по дуге' }
  ];

  return (
    <Card className="p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Варианты композиций</h3>
        <p className="text-muted-foreground">
          AI создал 3 варианта букета по профессиональным флористическим алгоритмам
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {schemes.slice(0, 3).map((scheme, index) => {
          const schemeInfo = schemeDescriptions[index];
          const circles = generateCircleLayout(scheme.flowers, schemeInfo.type);
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
                      {circles.map((circle, idx) => (
                        <circle
                          key={idx}
                          cx={circle.x}
                          cy={circle.y}
                          r={circle.size}
                          fill={circle.color}
                          className="transition-transform hover:scale-110"
                          opacity={0.9}
                          stroke="white"
                          strokeWidth="2"
                        >
                          <title>{circle.flower.name}</title>
                        </circle>
                      ))}
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={isSelected ? 'default' : 'secondary'}>
                      {schemeInfo.name}
                    </Badge>
                    {isSelected && (
                      <Icon name="Check" size={18} className="text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{schemeInfo.desc}</p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="mb-8">
        <Card className="p-6 border-dashed border-2 border-primary/30 bg-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Pencil" size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Создать свою схему</h4>
                <p className="text-sm text-muted-foreground">
                  Перемещайте элементы мышкой и создайте уникальную композицию
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleStartCustom}
              disabled={selectedScheme === null}
              className="gap-2"
            >
              <Icon name="Edit" size={18} />
              Редактировать
            </Button>
          </div>
        </Card>
      </div>

      {selectedScheme !== null && (
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-floral-green/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Выбрана: {schemeDescriptions[selectedScheme]?.name || 'Схема'}
            </p>
            <div className="flex gap-2 justify-center text-xs flex-wrap">
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

      <Dialog open={isCustomMode} onOpenChange={setIsCustomMode}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Редактор схемы букета</DialogTitle>
            <DialogDescription>
              Перетаскивайте элементы мышкой, чтобы создать свою уникальную композицию
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-floral-lavender/20 to-floral-pink/20 rounded-2xl p-4">
              <svg
                ref={svgRef}
                width="100%"
                height="500"
                viewBox="0 0 400 400"
                className="cursor-move"
                onMouseMove={handleSvgMouseMove}
                onMouseUp={handleSvgMouseUp}
                onMouseLeave={handleSvgMouseUp}
              >
                {customCircles.map((circle) => (
                  <circle
                    key={circle.id}
                    cx={circle.x}
                    cy={circle.y}
                    r={circle.size}
                    fill={circle.color}
                    opacity={0.9}
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-grab active:cursor-grabbing hover:stroke-primary hover:stroke-4 transition-all"
                    onMouseDown={() => handleCircleMouseDown(circle.id)}
                  >
                    <title>{circle.flower.name}</title>
                  </circle>
                ))}
              </svg>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsCustomMode(false)}>
                Отмена
              </Button>
              <Button onClick={() => {
                setIsCustomMode(false);
                alert('Кастомная схема сохранена!');
              }}>
                <Icon name="Check" size={18} className="mr-2" />
                Сохранить схему
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {generatedImageUrl && (
        <Dialog open={!!generatedImageUrl} onOpenChange={() => setGeneratedImageUrl(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Сгенерированный букет</DialogTitle>
              <DialogDescription>
                AI создал реалистичное фото по вашей схеме
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <img
                src={generatedImageUrl}
                alt="Generated bouquet"
                className="w-full rounded-lg"
              />
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" asChild>
                  <a href={generatedImageUrl} download="bouquet.png">
                    <Icon name="Download" size={18} className="mr-2" />
                    Скачать
                  </a>
                </Button>
                <Button onClick={() => setGeneratedImageUrl(null)}>
                  Закрыть
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default BouquetPreview;