import React from 'react';
import { Play, Check, Loader2, Home, BookOpen, Film, Sun, Flame, PowerOff, Edit3 } from 'lucide-react';
import { LightingScene } from '../../types/vesta';
import { useVesta } from '../../context/VestaContext';

interface SceneCardProps {
  scene: LightingScene;
  onEdit?: () => void;
}

export const SceneCard: React.FC<SceneCardProps> = ({ scene, onEdit }) => {
  const { runScene, executingSceneId, language, navigateTo } = useVesta();

  const isExecuting = executingSceneId === scene.id;

  const renderIcon = () => {
    const props = { className: 'w-5 h-5 text-white' };
    switch (scene.iconName) {
      case 'Home':
        return <Home {...props} />;
      case 'BookOpen':
        return <BookOpen {...props} />;
      case 'Film':
        return <Film {...props} />;
      case 'Sun':
        return <Sun {...props} />;
      case 'Flame':
        return <Flame {...props} />;
      default:
        return <PowerOff {...props} />;
    }
  };

  return (
    <div className="rounded-2xl p-4 bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] shadow-xs flex flex-col justify-between transition-all hover:border-[#E2BFA9] dark:hover:border-[#5E4537]">
      <div className="flex items-start justify-between gap-3">
        {/* Visual Scene Badge with actual warm hue */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
          style={{ backgroundColor: scene.color }}
        >
          {renderIcon()}
        </div>

        {/* Edit Button */}
        <button
          onClick={() => {
            if (onEdit) onEdit();
            else navigateTo('create_scene');
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#775A4C] dark:text-[#C2ABA0] hover:bg-[#FFDFCA] dark:hover:bg-[#3D2C23] active:scale-95 transition-all"
          title={language === 'zh' ? '编辑场景' : 'Edit Scene'}
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-semibold text-[#302018] dark:text-[#FFEDE2]">
          {language === 'zh' ? scene.name : scene.nameEn}
        </h4>
        <p className="text-xs text-[#775A4C] dark:text-[#C2ABA0] mt-0.5 line-clamp-1">
          {language === 'zh' ? scene.description : scene.descriptionEn}
        </p>
      </div>

      {/* Primary Execution CTA Button (full touch target >= 44px) */}
      <div className="mt-3.5 pt-2.5 border-t border-[#F0D5C4]/60 dark:border-[#463328]/60 flex items-center justify-end">
        <button
          onClick={() => runScene(scene.id)}
          disabled={isExecuting}
          className="min-h-[40px] px-3.5 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-medium flex items-center gap-1.5 shadow-xs hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
        >
          {isExecuting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{language === 'zh' ? '应用中' : 'Applying...'}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{language === 'zh' ? '执行' : 'Apply'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
