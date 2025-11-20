import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { SelectedFlower } from './BouquetConstructor';

interface Flower {
  id: string;
  name: string;
  colors: { name: string; hex: string }[];
  emoji: string;
  description: string;
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
        emoji: '🌹',
        description: 'Классика флористики',
        colors: [
          { name: 'Красная', hex: '#DC143C' },
          { name: 'Розовая', hex: '#FF69B4' },
          { name: 'Белая', hex: '#FFF5EE' },
          { name: 'Персиковая', hex: '#FFDAB9' },
          { name: 'Бордовая', hex: '#800020' }
        ]
      },
      {
        id: 'peony',
        name: 'Пион',
        emoji: '🌺',
        description: 'Пышный и нежный',
        colors: [
          { name: 'Розовый', hex: '#FFB6C1' },
          { name: 'Белый', hex: '#FFFAF0' },
          { name: 'Коралловый', hex: '#FF7F50' },
          { name: 'Красный', hex: '#DC143C' }
        ]
      },
      {
        id: 'tulip',
        name: 'Тюльпан',
        emoji: '🌷',
        description: 'Весенний символ',
        colors: [
          { name: 'Красный', hex: '#FF0000' },
          { name: 'Желтый', hex: '#FFD700' },
          { name: 'Розовый', hex: '#FF69B4' },
          { name: 'Белый', hex: '#FFFFFF' },
          { name: 'Фиолетовый', hex: '#9370DB' }
        ]
      },
      {
        id: 'sunflower',
        name: 'Подсолнух',
        emoji: '🌻',
        description: 'Яркий и солнечный',
        colors: [
          { name: 'Желтый', hex: '#FFD700' },
          { name: 'Оранжевый', hex: '#FFA500' }
        ]
      },
      {
        id: 'lily',
        name: 'Лилия',
        emoji: '🏵️',
        description: 'Элегантный аромат',
        colors: [
          { name: 'Белая', hex: '#FFFAFA' },
          { name: 'Розовая', hex: '#FFB6D9' },
          { name: 'Оранжевая', hex: '#FF8C42' }
        ]
      },
      {
        id: 'orchid',
        name: 'Орхидея',
        emoji: '🌸',
        description: 'Экзотическая красота',
        colors: [
          { name: 'Белая', hex: '#FFFAFA' },
          { name: 'Розовая', hex: '#FFB6D9' },
          { name: 'Фиолетовая', hex: '#9370DB' }
        ]
      }
    ],
    secondary: [
      {
        id: 'chrysanthemum',
        name: 'Хризантема',
        emoji: '💮',
        description: 'Многослойные лепестки',
        colors: [
          { name: 'Белая', hex: '#F5F5F5' },
          { name: 'Желтая', hex: '#FFEB3B' },
          { name: 'Розовая', hex: '#F8BBD0' },
          { name: 'Сиреневая', hex: '#CE93D8' }
        ]
      },
      {
        id: 'carnation',
        name: 'Гвоздика',
        emoji: '🌸',
        description: 'Нежная текстура',
        colors: [
          { name: 'Красная', hex: '#E91E63' },
          { name: 'Розовая', hex: '#F48FB1' },
          { name: 'Белая', hex: '#FAFAFA' }
        ]
      },
      {
        id: 'freesia',
        name: 'Фрезия',
        emoji: '🌼',
        description: 'Тонкий аромат',
        colors: [
          { name: 'Белая', hex: '#FFFFFF' },
          { name: 'Желтая', hex: '#FFF59D' },
          { name: 'Фиолетовая', hex: '#B39DDB' }
        ]
      },
      {
        id: 'ranunculus',
        name: 'Ранункулюс',
        emoji: '🌺',
        description: 'Круглые бутоны',
        colors: [
          { name: 'Розовый', hex: '#FFB3C6' },
          { name: 'Персиковый', hex: '#FFDAC1' },
          { name: 'Белый', hex: '#FFF5F7' },
          { name: 'Желтый', hex: '#FFF8DC' }
        ]
      },
      {
        id: 'hydrangea',
        name: 'Гортензия',
        emoji: '💐',
        description: 'Объемные соцветия',
        colors: [
          { name: 'Голубая', hex: '#B3E5FC' },
          { name: 'Розовая', hex: '#F8BBD0' },
          { name: 'Белая', hex: '#F5F5F5' },
          { name: 'Фиолетовая', hex: '#D1C4E9' }
        ]
      }
    ],
    filler: [
      {
        id: 'eucalyptus',
        name: 'Эвкалипт',
        emoji: '🌿',
        description: 'Зелень для объема',
        colors: [
          { name: 'Зеленый', hex: '#8BC34A' },
          { name: 'Серебристый', hex: '#A8D8AC' }
        ]
      },
      {
        id: 'gypsophila',
        name: 'Гипсофила',
        emoji: '✨',
        description: 'Воздушное облако',
        colors: [
          { name: 'Белая', hex: '#FFFFFF' },
          { name: 'Розовая', hex: '#FFE4E1' }
        ]
      },
      {
        id: 'fern',
        name: 'Папоротник',
        emoji: '🌱',
        description: 'Структура букета',
        colors: [{ name: 'Зеленый', hex: '#689F38' }]
      },
      {
        id: 'wheat',
        name: 'Колосья',
        emoji: '🌾',
        description: 'Рустикальный акцент',
        colors: [
          { name: 'Золотой', hex: '#DAA520' },
          { name: 'Бежевый', hex: '#F5DEB3' }
        ]
      },
      {
        id: 'lavender',
        name: 'Лаванда',
        emoji: '💜',
        description: 'Ароматный декор',
        colors: [
          { name: 'Сиреневая', hex: '#E6E6FA' },
          { name: 'Фиолетовая', hex: '#9370DB' }
        ]
      },
      {
        id: 'leaf',
        name: 'Листья',
        emoji: '🍃',
        description: 'Каркас композиции',
        colors: [
          { name: 'Зеленый', hex: '#4CAF50' },
          { name: 'Темно-зеленый', hex: '#2E7D32' }
        ]
      },
      {
        id: 'berries',
        name: 'Ягоды',
        emoji: '🫐',
        description: 'Яркий акцент',
        colors: [
          { name: 'Красные', hex: '#DC143C' },
          { name: 'Синие', hex: '#4169E1' }
        ]
      }
    ]
  };

  const currentFlowers = flowers[type];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentFlowers.map((flower) => (
        <Card key={flower.id} className="p-4 hover:shadow-lg hover:scale-102 transition-all group">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-5xl group-hover:scale-110 transition-transform">{flower.emoji}</div>
            <div className="flex-1">
              <h5 className="font-semibold mb-1">{flower.name}</h5>
              <p className="text-xs text-muted-foreground mb-1">{flower.description}</p>
              <Badge variant="secondary" className="text-xs">
                {type === 'focal' && 'Фокальные'}
                {type === 'secondary' && 'Второстепенные'}
                {type === 'filler' && 'Декор'}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {flower.colors.map((color) => (
                <Button
                  key={`${flower.id}-${color.hex}`}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 h-auto py-2 px-3 hover:scale-105 transition-transform"
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
                    className="w-6 h-6 rounded-full border-2 border-white shadow-md flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-medium">{color.name}</span>
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