import React from "react"

type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: { icon: React.ReactNode; text: string }[];
    borderColor: string;
    delay: number;
    benefits: string[];
    integrations?: string[];
    stats?: { value: string; label: string }[];
  };

  const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, features, borderColor, delay, benefits, integrations, stats }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`bg-[#1E293B]/50 p-8 rounded-2xl backdrop-blur-lg border border-gray-700 hover:border-[${borderColor}]/50 transition-all duration-300 hover:transform hover:-translate-y-2 relative overflow-hidden group`}
        aria-labelledby={`feature-${title.replace(/\s+/g, '-').toLowerCase()}-title`}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          initial={{ x: '-100%', opacity: 0 }}
          animate={isHovered ? { x: '100%', opacity: 0.1 } : { x: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
  
        <div className="flex items-start gap-6">
          <div className={`p-3 bg-[${borderColor}]/10 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 id={`feature-${title.replace(/\s+/g, '-').toLowerCase()}-title`} className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-gray-400 mb-4">{description}</p>
            
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {features.map((feature, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center text-sm text-gray-400 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700/50 hover:border-gray-600 transition-colors"
                  >
                    {feature.icon}
                    <span className="ml-2">{feature.text}</span>
                  </motion.span>
                ))}
              </div>
  
              {stats && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
  
              {benefits && benefits.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Benefits</h4>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center text-sm text-gray-400"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
  
              {integrations && integrations.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Integrations</h4>
                  <div className="flex flex-wrap gap-2">
                    {integrations.map((integration, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="text-xs bg-gray-700/50 text-gray-300 px-2.5 py-1.5 rounded-full border border-gray-600/50 hover:border-gray-500 transition-colors"
                      >
                        {integration}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
  
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-6 text-sm text-[${borderColor}] hover:text-white transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[${borderColor}] rounded-lg px-3 py-1.5`}
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };