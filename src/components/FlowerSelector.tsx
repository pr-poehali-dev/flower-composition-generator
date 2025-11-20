import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { SelectedFlower } from './BouquetConstructor';

interface Flower {
  id: string;
  name: string;
  colors: { name: string; hex: string }[];
  image: string;
}

interface FlowerSelectorProps {
  type: 'focal' | 'secondary' | 'filler';
  onSelect: (flower: SelectedFlower) => void;
}

const FlowerSelector = ({ type, onSelect }: FlowerSelectorProps) => {
  const flowers: Record<string, Flower[]> = {
    focal: [
      {
        id: 'rose',
        name: 'Роза',
        colors: [
          { name: 'Красная', hex: '#DC143C' },
          { name: 'Розовая', hex: '#FF69B4' },
          { name: 'Белая', hex: '#FFF5EE' },
          { name: 'Персиковая', hex: '#FFDAB9' }
        ],
        image: '🌹'
      },
      {
        id: 'peony',
        name: 'Пион',
        colors: [
          { name: 'Розовый', hex: '#FFB6C1' },
          { name: 'Белый', hex: '#FFFAF0' },
          { name: 'Коралловый', hex: '#FF7F50' }
        ],
        image: '🌺'
      },
      {
        id: 'tulip',
        name: 'Тюльпан',
        colors: [
          { name: 'Красный', hex: '#FF0000' },
          { name: 'Желтый', hex: '#FFD700' },
          { name: 'Розовый', hex: '#FF69B4' },
          { name: 'Белый', hex: '#FFFFFF' },
          { name: 'Фиолетовый', hex: '#9370DB' }
        ],
        image: '🌷'
      },
      {
        id: 'sunflower',
        name: 'Подсолнух',
        colors: [
          { name: 'Желтый', hex: '#FFD700' },
          { name: 'Оранжевый', hex: '#FFA500' }
        ],
        image: '🌻'
      },
      {
        id: 'lily',
        name: 'Лилия',
        colors: [
          { name: 'Белая', hex: '#FFFAFA' },
          { name: 'Розовая', hex: '#FFB6D9' },
          { name: 'Оранжевая', hex: '#FF8C42' }
        ],
        image: '🏵️'
      }
    ],
    secondary: [
      {
        id: 'chrysanthemum',
        name: 'Хризантема',
        colors: [
          { name: 'Белая', hex: '#F5F5F5' },
          { name: 'Желтая', hex: '#FFEB3B' },
          { name: 'Розовая', hex: '#F8BBD0' },
          { name: 'Сиреневая', hex: '#CE93D8' }
        ],
        image: '💮'
      },
      {
        id: 'carnation',
        name: 'Гвоздика',
        colors: [
          { name: 'Красная', hex: '#E91E63' },
          { name: 'Розовая', hex: '#F48FB1' },
          { name: 'Белая', hex: '#FAFAFA' }
        ],
        image: '🌸'
      },
      {
        id: 'freesia',
        name: 'Фрезия',
        colors: [
          { name: 'Белая', hex: '#FFFFFF' },
          { name: 'Желтая', hex: '#FFF59D' },
          { name: 'Фиолетовая', hex: '#B39DDB' }
        ],
        image: '🌼'
      },
      {
        id: 'ranunculus',
        name: 'Ранункулюс',
        colors: [
          { name: 'Розовый', hex: '#FFB3C6' },
          { name: 'Персиковый', hex: '#FFDAC1' },
          { name: 'Белый', hex: '#FFF5F7' },
          { name: 'Желтый', hex: '#FFF8DC' }
        ],
        image: '🌺'
      },
      {
        id: 'hydrangea',
        name: 'Гортензия',
        colors: [
          { name: 'Голубая', hex: '#B3E5FC' },
          { name: 'Розовая', hex: '#F8BBD0' },
          { name: 'Белая', hex: '#F5F5F5' },
          { name: 'Фиолетовая', hex: '#D1C4E9' }
        ],
        image: '🌸'
      }
    ],
    filler: [
      {
        id: 'eucalyptus',
        name: 'Эвкалипт',
        colors: [{ name: 'Зеленый', hex: '#8BC34A' }],
        image: '🌿'
      },
      {
        id: 'gypsophila',
        name: 'Гипсофила',
        colors: [
          { name: 'Белая', hex: '#FFFFFF' },
          { name: 'Розовая', hex: '#FFE4E1' }
        ],
        image: '✨'
      },
      {
        id: 'fern',
        name: 'Папоротник',
        colors: [{ name: 'Зеленый', hex: '#689F38' }],
        image: '🌱'
      },
      {
        id: 'wheat',
        name: 'Колосья',
        colors: [
          { name: 'Золотой', hex: '#DAA520' },
          { name: 'Бежевый', hex: '#F5DEB3' }
        ],
        image: '🌾'
      },
      {
        id: 'lavender',
        name: 'Лаванда',
        colors: [
          { name: 'Сиреневая', hex: '#E6E6FA' },
          { name: 'Фиолетовая', hex: '#9370DB' }
        ],
        image: '🌿'
      },
      {
        id: 'leaf',
        name: 'Декоративные листья',
        colors: [
          { name: 'Зеленый', hex: '#4CAF50' },
          { name: 'Темно-зеленый', hex: '#2E7D32' }
        ],
        image: '🍃'
      }
    ]
  };

  const currentFlowers = flowers[type];

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {currentFlowers.map((flower) => (
        <Card key={flower.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-4xl">{flower.image}</div>
            <div className="flex-1">
              <h5 className="font-semibold mb-1">{flower.name}</h5>
              <Badge variant="secondary" className="text-xs">
                {type === 'focal' && 'Крупные бутоны'}
                {type === 'secondary' && 'Средние цветки'}
                {type === 'filler' && 'Декор'}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-2">Доступные цвета:</p>
            <div className="grid grid-cols-2 gap-2">
              {flower.colors.map((color) => (
                <Button
                  key={`${flower.id}-${color.hex}`}
                  variant="outline"
                  size="sm"
                  className="justify-start gap-2 h-auto py-2"
                  onClick={() =>
                    onSelect({
                      id: `${flower.id}-${color.hex}`,
                      name: `${flower.name} (${color.name})`,
                      type,
                      color: color.hex,
                      count: 1
                    })
                  }
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs truncate">{color.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FlowerSelector;
