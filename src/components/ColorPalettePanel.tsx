import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ColorPalette {
  id: string;
  name: string;
  description: string;
  colors: string[];
}

const ColorPalettePanel = () => {
  const palettes: ColorPalette[] = [
    {
      id: 'romantic',
      name: 'Романтика',
      description: 'Нежные розовые и персиковые оттенки',
      colors: ['#FFB6C1', '#FFDAB9', '#FFF0F5', '#FFE4E1', '#F0E6F6']
    },
    {
      id: 'spring',
      name: 'Весенняя свежесть',
      description: 'Яркие желтые и зеленые тона',
      colors: ['#FFEB3B', '#8BC34A', '#FFFACD', '#E8F5E9', '#FFF9C4']
    },
    {
      id: 'lavender',
      name: 'Лавандовые поля',
      description: 'Сиреневые и фиолетовые оттенки',
      colors: ['#E6E6FA', '#DDA0DD', '#D8BFD8', '#F3E5F5', '#B39DDB']
    },
    {
      id: 'sunset',
      name: 'Закатное солнце',
      description: 'Теплые оранжевые и красные тона',
      colors: ['#FF7F50', '#FFA07A', '#FFB347', '#FFDAB9', '#FFE4B5']
    },
    {
      id: 'ocean',
      name: 'Океанский бриз',
      description: 'Голубые и белые оттенки',
      colors: ['#B3E5FC', '#E1F5FE', '#FFFFFF', '#F0F8FF', '#E0F7FA']
    },
    {
      id: 'autumn',
      name: 'Осенний лес',
      description: 'Бордовые и золотые цвета',
      colors: ['#8B0000', '#DAA520', '#CD853F', '#D2691E', '#BC8F8F']
    },
    {
      id: 'tropical',
      name: 'Тропики',
      description: 'Яркие контрастные оттенки',
      colors: ['#FF1493', '#FF8C00', '#32CD32', '#FFD700', '#FF6347']
    },
    {
      id: 'classic',
      name: 'Классика',
      description: 'Красные и белые тона',
      colors: ['#DC143C', '#FFFFFF', '#FFE4E1', '#F5F5F5', '#FFF5EE']
    },
    {
      id: 'vintage',
      name: 'Винтаж',
      description: 'Приглушенные пастельные тона',
      colors: ['#D4C5C7', '#C9A9A6', '#E8D5C4', '#F5E6E8', '#D5C6E0']
    },
    {
      id: 'modern',
      name: 'Современный',
      description: 'Контрастные яркие цвета',
      colors: ['#FF6B9D', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181']
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-floral-lavender/10 to-floral-pink/10">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-lg">Рекомендуемые палитры</h4>
        <Badge variant="secondary">10 палитр</Badge>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {palettes.map((palette) => (
          <div
            key={palette.id}
            className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer group"
          >
            <h5 className="font-semibold mb-1 group-hover:text-primary transition-colors">
              {palette.name}
            </h5>
            <p className="text-xs text-muted-foreground mb-3">{palette.description}</p>
            <div className="flex gap-1.5">
              {palette.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1 h-10 rounded-md border-2 border-white shadow-sm group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        💡 Выбирайте цвета из палитр для гармоничного сочетания
      </p>
    </Card>
  );
};

export default ColorPalettePanel;
