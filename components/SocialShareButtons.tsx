import React from 'react';

interface SocialShareButtonsProps {
  axolotlName: string;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ axolotlName }) => {
  const shareText = `Check out my custom Axolotl: ${axolotlName}! Created with Axoloti AI Image Studio`;
  const shareUrl = window.location.href;

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'reddit':
        url = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="w-full mt-4 pt-4 border-t border-gray-600">
      <p className="text-gray-400 text-sm text-center mb-2">Share your creation:</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleShare('twitter')}
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Twitter
        </button>
        <button
          onClick={() => handleShare('facebook')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Facebook
        </button>
        <button
          onClick={() => handleShare('reddit')}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Reddit
        </button>
      </div>
    </div>
  );
};
