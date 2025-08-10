import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Users, Heart } from 'lucide-react';

const mantras = [
  {
    id: 1,
    name: 'Om Namah Shivaya',
    deity: 'Lord Shiva',
    sanskrit: 'ॐ नमः शिवाय',
    transliteration: 'Om Namaḥ Śivāya',
    meaning: 'I bow to Shiva, the supreme consciousness',
    benefits: ['Inner peace', 'Spiritual awakening', 'Removes negativity'],
    difficulty: 'Beginner',
    duration: '108 repetitions',
    practitioners: 15420,
    category: 'Peace & Calming',
    emoji: '🕉️'
  },
  {
    id: 2,
    name: 'Hare Krishna Mahamantra',
    deity: 'Lord Krishna',
    sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
    transliteration: 'Hare Kṛṣṇa Hare Kṛṣṇa Kṛṣṇa Kṛṣṇa Hare Hare',
    meaning: 'O divine energy of Krishna, please engage me in your service',
    benefits: ['Divine love', 'Joy', 'Connection with Krishna'],
    difficulty: 'Beginner',
    duration: '108 repetitions',
    practitioners: 23567,
    category: 'Devotion & Love',
    emoji: '💙'
  },
  {
    id: 3,
    name: 'Om Gam Ganapataye Namaha',
    deity: 'Lord Ganesha',
    sanskrit: 'ॐ गं गणपतये नमः',
    transliteration: 'Om Gaṃ Gaṇapataye Namaḥ',
    meaning: 'Salutations to Lord Ganesha, remover of obstacles',
    benefits: ['Removes obstacles', 'New beginnings', 'Success'],
    difficulty: 'Beginner',
    duration: '108 repetitions',
    practitioners: 18934,
    category: 'Prosperity & Success',
    emoji: '🐘'
  },
  {
    id: 4,
    name: 'So Hum',
    deity: 'Universal Consciousness',
    sanskrit: 'सो ऽहम्',
    transliteration: 'So \'ham',
    meaning: 'I am that (divine consciousness)',
    benefits: ['Self-realization', 'Unity consciousness', 'Inner knowing'],
    difficulty: 'Intermediate',
    duration: '216 repetitions',
    practitioners: 8765,
    category: 'Wisdom & Knowledge',
    emoji: '✨'
  },
  {
    id: 5,
    name: 'Om Mani Padme Hum',
    deity: 'Avalokiteshvara',
    sanskrit: 'ॐ मणि पद्मे हूँ',
    transliteration: 'Om Maṇi Padme Hūṃ',
    meaning: 'The jewel in the lotus of the heart',
    benefits: ['Compassion', 'Healing', 'Universal love'],
    difficulty: 'Intermediate',
    practitioners: 12543,
    category: 'Health & Healing',
    emoji: '🪷'
  },
  {
    id: 6,
    name: 'Gayatri Mantra',
    deity: 'Savitri (Solar Deity)',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    transliteration: 'Om Bhūr Bhuvaḥ Svaḥ Tat Savitur Vareṇyaṃ Bhargo Devasya Dhīmahi Dhiyo Yo Naḥ Pracodayāt',
    meaning: 'We meditate on the divine light that illuminates our intelligence',
    benefits: ['Wisdom', 'Clarity', 'Divine guidance'],
    difficulty: 'Advanced',
    duration: '108 repetitions',
    practitioners: 34567,
    category: 'Wisdom & Knowledge',
    emoji: '☀️'
  }
];

const categories = [
  'All Categories',
  'Peace & Calming',
  'Devotion & Love',
  'Prosperity & Success',
  'Wisdom & Knowledge',
  'Health & Healing'
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const JapaMantras: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All Categories');

  const filteredMantras = selectedCategory === 'All Categories' 
    ? mantras 
    : mantras.filter(mantra => mantra.category === selectedCategory);

  return (
    <div className="min-h-screen bg-sacred-cream">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-4xl font-bold text-sacred-maroon mb-4">Japa Mantras</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sacred mantras for meditation, healing, and spiritual transformation
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Mantras Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMantras.map((mantra) => (
            <Card key={mantra.id} className="card-lotus hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl">{mantra.emoji}</div>
                  <Badge className={getDifficultyColor(mantra.difficulty)}>
                    {mantra.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-sacred-maroon text-lg mb-1">
                  {mantra.name}
                </CardTitle>
                <p className="text-sm text-sacred-orange font-semibold">
                  {mantra.deity}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Sanskrit & Transliteration */}
                <div className="text-center p-3 bg-gradient-lotus rounded-lg">
                  <p className="text-lg font-sanskrit text-sacred-maroon mb-2">
                    {mantra.sanskrit}
                  </p>
                  <p className="text-sm italic text-muted-foreground">
                    {mantra.transliteration}
                  </p>
                </div>

                {/* Meaning */}
                <div>
                  <p className="text-sm font-semibold text-sacred-orange mb-1">Meaning:</p>
                  <p className="text-sm text-muted-foreground">{mantra.meaning}</p>
                </div>

                {/* Benefits */}
                <div>
                  <p className="text-sm font-semibold text-sacred-orange mb-2">Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {mantra.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{mantra.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>{mantra.practitioners.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart size={14} />
                    <span>{mantra.category}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button asChild className="flex-1 btn-lotus">
                    <Link to="/app/japa/counter">
                      <Play size={16} className="mr-2" />
                      Start Japa
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    🔊
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};