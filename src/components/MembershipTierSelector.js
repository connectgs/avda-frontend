import React from 'react';

const MembershipTierSelector = ({ selectedTier, onTierSelect }) => {
  const tiers = [
    {
      id: 'Basic',
      name: 'Basic',
      price: 100,
      color: 'from-gray-500 to-gray-600',
      features: [
        'Basic profile listing',
        'Medical stream & specialty',
        'City & state visible',
        'Council registration shown',
        'Email contact only',
        'Listed in search results',
      ],
      notIncluded: [
        'No profile photo displayed',
        'No phone number shown',
        'No priority in search',
        'Limited profile views',
      ],
      waiver: true,
      limitedFree: true
    },
    {
      id: 'Premium',
      name: 'Premium',
      price: 500,
      color: 'from-blue-500 to-purple-500',
      popular: true,
      features: [
        'Everything in Basic',
        'Profile photo displayed',
        'Phone number visible',
        'Full address shown',
        'WhatsApp contact button',
        'Areas of interest/bio',
        'Years of experience',
        'Profile analytics (views)',
        'Edit profile anytime',
        'Listed in "Active Members"',
        'Social media links',
      ],
      notIncluded: []
    },
    {
      id: 'VIP',
      name: 'VIP',
      price: 1500,
      color: 'from-yellow-500 to-orange-500',
      features: [
        'Everything in Premium',
        'Priority in search results',
        'Featured on homepage',
        '"Verified Professional" badge',
        'Multiple photos (clinic, certificates)',
        'Featured in chapter pages',
        'Matrimony priority (if enrolled)',
        'CME event priority registration',
        'Annual profile boost (top of search)',
        'Referral tracking',
        'Network insights (profile viewers)',
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Choose Your Membership Tier</h3>
        <div className="inline-block bg-gradient-to-r from-amber-800/40 to-orange-800/40 border border-amber-500/50 text-white px-8 py-4 rounded-lg mb-4">
          <p className="font-bold text-xl text-amber-300">Inaugural Offer</p>
          <p className="text-base text-gray-200 mt-1">
            First 50 Basic members per region receive complete waiver.
          </p>
          <p className="text-sm text-amber-200/80 mt-2 italic">
            Limited inaugural opportunity.
          </p>
        </div>
        <p className="text-gray-400">
          Select the membership tier that best suits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.id;

          return (
            <div
              key={tier.id}
              onClick={() => onTierSelect(tier.id)}
              className={`relative bg-white/5 backdrop-blur-md rounded-xl p-6 border-2 transition cursor-pointer ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-500/50'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                </div>
              )}

              <div className="text-center mb-4">
                <h4 className="text-2xl font-bold text-white mb-2">{tier.name}</h4>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">₹{tier.price}</span>
                  <span className="text-gray-400 ml-1">/year</span>
                </div>
                {tier.limitedFree && (
                  <p className="text-amber-300 text-sm mt-2 font-semibold">
                    Limited free registration
                  </p>
                )}
                {tier.waiver && !tier.limitedFree && (
                  <p className="text-amber-300 text-sm mt-2 italic">
                    If eligible, your contribution will be waived.
                  </p>
                )}
              </div>

              <div className={`h-1 w-full bg-gradient-to-r ${tier.color} rounded-full mb-4`}></div>

              <div className="space-y-2 mb-4">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {tier.notIncluded.length > 0 && (
                <div className="space-y-2 border-t border-white/10 pt-4">
                  {tier.notIncluded.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-gray-500 mr-2">✗</span>
                      <span className="text-gray-500 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {isSelected && (
                <div className="mt-4 text-center">
                  <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
                    ✓ Selected
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-500 text-xs mt-4">
        Contributions currently not eligible for tax exemption.
      </p>
    </div>
  );
};

export default MembershipTierSelector;
