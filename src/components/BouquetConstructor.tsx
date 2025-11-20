import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import FlowerSelector from '@/components/FlowerSelector';
import ColorPalettePanel from '@/components/ColorPalettePanel';
import BouquetPreview from '@/components/BouquetPreview';

export interface SelectedFlower {
  id: string;
  name: string;
  type: 'focal' | 'secondary' | 'filler';
  color: string;
  count: number;
}

const BouquetConstructor = () => {
  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlower[]>([]);
  const [generatedSchemes, setGeneratedSchemes] = useState<any[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<number | null>(null);
  const [showPalette, setShowPalette] = useState(false);

  const addFlower = (flower: SelectedFlower) => {
    const existing = selectedFlowers.find(f => f.id === flower.id);
    if (existing) {
      setSelectedFlowers(selectedFlowers.map(f =>
        f.id === flower.id ? { ...f, count: f.count + 1 } : f
      ));
    } else {
      setSelectedFlowers([...selectedFlowers, flower]);
    }
  };

  const removeFlower = (id: string) => {
    setSelectedFlowers(selectedFlowers.filter(f => f.id !== id));
  };

  const updateFlowerCount = (id: string, count: number) => {
    if (count <= 0) {
      removeFlower(id);
    } else {
      setSelectedFlowers(selectedFlowers.map(f =>
        f.id === id ? { ...f, count } : f
      ));
    }
  };

  const generateSchemes = () => {
    const schemes = [];
    for (let i = 0; i < 3; i++) {
      schemes.push({
        id: i,
        flowers: selectedFlowers,
        pattern: `Схема ${i + 1}`
      });
    }
    setGeneratedSchemes(schemes);
    setSelectedScheme(0);
  };

  const totalFlowers = selectedFlowers.reduce((sum, f) => sum + f.count, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Конструктор букета</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPalette(!showPalette)}
                className="gap-2"
              >
                <Icon name="Palette" size={16} />
                {showPalette ? 'Скрыть палитры' : 'Палитры цветов'}
              </Button>
            </div>

            {showPalette && (
              <div className="mb-6">
                <ColorPalettePanel />
              </div>
            )}

            <Tabs defaultValue="focal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="focal">Фокальные цветы</TabsTrigger>
                <TabsTrigger value="secondary">Второстепенные</TabsTrigger>
                <TabsTrigger value="filler">Декор</TabsTrigger>
              </TabsList>

              <TabsContent value="focal">
                <FlowerSelector type="focal" onSelect={addFlower} />
              </TabsContent>

              <TabsContent value="secondary">
                <FlowerSelector type="secondary" onSelect={addFlower} />
              </TabsContent>

              <TabsContent value="filler">
                <FlowerSelector type="filler" onSelect={addFlower} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h4 className="font-bold text-lg mb-4">Выбранные элементы</h4>

            {selectedFlowers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Flower2" size={48} className="mx-auto mb-3 opacity-30" />
                <p>Выберите цветы для букета</p>
              </div>
            ) : (
              <>
                <ScrollArea className="h-[300px] mb-4">
                  <div className="space-y-3">
                    {selectedFlowers.map((flower) => (
                      <div key={flower.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div
                          className="w-10 h-10 rounded-full flex-shrink-0"
                          style={{ backgroundColor: flower.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{flower.name}</p>
                          <Badge variant="outline" className="text-xs">{flower.type}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={() => updateFlowerCount(flower.id, flower.count - 1)}
                          >
                            -
                          </Button>
                          <span className="text-sm font-semibold w-6 text-center">{flower.count}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={() => updateFlowerCount(flower.id, flower.count + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Всего элементов:</span>
                    <span className="font-semibold">{totalFlowers}</span>
                  </div>

                  <Button
                    className="w-full gap-2"
                    size="lg"
                    onClick={generateSchemes}
                    disabled={totalFlowers < 5}
                  >
                    <Icon name="Wand2" size={18} />
                    Генерировать схемы
                  </Button>

                  {totalFlowers < 5 && (
                    <p className="text-xs text-muted-foreground text-center">
                      Минимум 5 элементов для создания букета
                    </p>
                  )}
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      {generatedSchemes.length > 0 && (
        <div className="mt-8">
          <BouquetPreview
            schemes={generatedSchemes}
            selectedScheme={selectedScheme}
            onSelectScheme={setSelectedScheme}
          />
        </div>
      )}
    </div>
  );
};

export default BouquetConstructor;
