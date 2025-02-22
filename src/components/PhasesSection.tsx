
const PhasesSection = () => {
  const phases = [
    {
      title: "Phase 1",
      description: "Préalable au permis AC",
      items: [
        "Le véhicule",
        "Le conducteur",
        "L'environnement",
        "Comportement à risque",
        "Évaluation",
      ],
    },
    {
      title: "Phase 2",
      description: "Conduite dirigée",
      items: ["Conduite accompagnée", "Stratégie OEA", "SORTIE 3", "SORTIE 4"],
    },
    {
      title: "Phase 3",
      description: "Conduite semi-dirigée",
      items: [
        "Vitesse",
        "SORTIE 5",
        "SORTIE 6",
        "SORTIE 7",
        "Partage de la route",
        "SORTIE 8",
        "SORTIE 9",
        "Alcool, drogues",
        "SORTIE 10",
      ],
    },
    {
      title: "Phase 4",
      description: "Conduite semi-dirigée à autonome",
      items: [
        "Fatigue, distractions",
        "SORTIE 12",
        "SORTIE 13",
        "Écoconduite",
        "SORTIE 14",
        "SORTIE 15",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6  rounded-lg shadow-md">
      {phases.map((phase, index) => (
        <div
          key={index}
          className="p-4 bg-white dark:bg-boxdark rounded-lg shadow-sm hover:shadow-lg transition duration-300"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-whiten mb-2">
            {phase.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-bodydark mb-4">
            {phase.description}
          </p>
          <ul className="space-y-2">
            {phase.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="text-sm text-gray-700 dark:text-body cursor-pointer hover:text-primary dark:hover:text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PhasesSection;
