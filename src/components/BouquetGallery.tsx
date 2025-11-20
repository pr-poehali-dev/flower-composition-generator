import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GalleryBouquet {
  id: number;
  name: string;
  colors: string[];
  focalCount: number;
  secondaryCount: number;
  fillerCount: number;
}

const BouquetGallery = () => {
  const bouquets: GalleryBouquet[] = [
    {
      id: 1,
      name: 'Романтический закат',
      colors: ['#FF6B9D', '#FFB4D1', '#FFA07A', '#F0C4E1'],
      focalCount: 5,
      secondaryCount: 8,
      fillerCount: 12
    },
    {
      id: 2,
      name: 'Весенняя свежесть',
      colors: ['#98D8C8', '#B4E5D8', '#FFFACD', '#E6F3FF'],
      focalCount: 4,
      secondaryCount: 10,
      fillerCount: 15
    },
    {
      id: 3,
      name: 'Лавандовые сны',
      colors: ['#DDA0DD', '#E6A8D7', '#B8A9C9', '#F0E6FF'],
      focalCount: 6,
      secondaryCount: 7,
      fillerCount: 13
    },
    {
      id: 4,
      name: 'Персиковый бриз',
      colors: ['#FFDAB9', '#FFE4B5', '#FFA07A', '#FFE5CC'],
      focalCount: 5,
      secondaryCount: 9,
      fillerCount: 14
    },
    {
      id: 5,
      name: 'Тропический коктейль',
      colors: ['#FF6B9D', '#FFA500', '#98D8C8', '#FFD700'],
      focalCount: 7,
      secondaryCount: 8,
      fillerCount: 11
    },
    {
      id: 6,
      name: 'Нежная классика',
      colors: ['#FFF5EE', '#FFE4E1', '#E6E6FA', '#F5F5DC'],
      focalCount: 4,
      secondaryCount: 9,
      fillerCount: 16
    }
  ];

  const renderMiniCircles = (bouquet: GalleryBouquet) => {
    const centerX = 80;
    const centerY = 80;
    const circles = [];

    for (let i = 0; i < bouquet.focalCount; i++) {
      const angle = (Math.PI * 2 * i) / bouquet.focalCount;
      const distance = 15 + Math.random() * 10;
      circles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: 12,
        color: bouquet.colors[0]
      });
    }

    for (let i = 0; i < bouquet.secondaryCount; i++) {
      const angle = (Math.PI * 2 * i) / bouquet.secondaryCount;
      const distance = 30 + Math.random() * 12;
      circles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: 7,
        color: bouquet.colors[1] || bouquet.colors[0]
      });
    }

    for (let i = 0; i < bouquet.fillerCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 45 + Math.random() * 25;
      if (distance <= 70) {
        circles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: 4,
          color: bouquet.colors[2] || bouquet.colors[1] || bouquet.colors[0]
        });
      }
    }

    return circles;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Галерея композиций</h3>
        <p className="text-muted-foreground">
          Примеры букетов, созданных AI по разным цветовым палитрам
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bouquets.map((bouquet) => {
          const circles = renderMiniCircles(bouquet);
          return (
            <Card key={bouquet.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="mb-4">
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-floral-lavender/20 to-floral-pink/20 rounded-full flex items-center justify-center relative overflow-hidden">
                  <svg width="160" height="160" className="absolute inset-0">
                    {circles.map((circle, index) => (
                      <circle
                        key={index}
                        cx={circle.x}
                        cy={circle.y}
                        r={circle.size}
                        fill={circle.color}
                        className="transition-transform group-hover:scale-110"
                      />
                    ))}
                  </svg>
                </div>
              </div>

              <h4 className="font-bold text-lg text-center mb-3">{bouquet.name}</h4>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {bouquet.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary">{bouquet.focalCount} фокальных</Badge>
                <Badge variant="secondary">{bouquet.secondaryCount} средних</Badge>
                <Badge variant="secondary">{bouquet.fillerCount} декора</Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BouquetGallery;
