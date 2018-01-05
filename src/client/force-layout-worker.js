import { flatten, concat, map, values } from 'ramda';
const d3 = require('d3-force');

const {
  START_GRAPH_SCHEMA_SIMULATION,
  STOP_GRAPH_SCHEMA_SIMULATION,
  GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS
} = require('./force-layout');

const CLASS_FORCE_RADIUS = 125;
const CLASS_LINK_FORCE_RADIUS = 50;
const COLLIDE_FORCE_RADIUS_MULTIPLIER = 1.1;
const LINK_FORCE_DISTANCE = 175;

const graphSchemaSimulation = d3.forceSimulation().stop();

const startGraphSchemaSimulation = (classes, classLinks, dimensions) => {
  const classNodes = map(
    c => ({
      x: c.x,
      y: c.y,
      r: CLASS_FORCE_RADIUS,
      outerRadius: c.outerRadius,
      globalIndex: c.globalIndex
    }),
    classes
  );

  const classLinkNodes = map(
    l => ({
      x: l.x,
      y: l.y,
      r: CLASS_LINK_FORCE_RADIUS,
      length: l.length,
      globalIndex: l.globalIndex
    }),
    classLinks
  );

  const links = flatten(
    map(
      l => [
        {
          source: classNodes[classLinks[l.globalIndex].sourceIndex],
          target: l
        },
        {
          source: l,
          target: classNodes[classLinks[l.globalIndex].targetIndex]
        }
      ],
      values(classLinkNodes)
    )
  );

  graphSchemaSimulation
    .nodes(concat(values(classNodes), values(classLinkNodes)))
    .force('center', d3.forceCenter(...map(d => d / 2, dimensions)))
    .force(
      'collide',
      d3.forceCollide(node => node.r * COLLIDE_FORCE_RADIUS_MULTIPLIER)
    )
    .force('boundary', () =>
      graphSchemaSimulation.nodes().forEach(node => {
        const [width, height] = dimensions;
        node.x = Math.max(node.r, Math.min(width - node.r, node.x));
        node.y = Math.max(node.r, Math.min(height - node.r, node.y));
      })
    )
    .force('link', d3.forceLink(links).distance(LINK_FORCE_DISTANCE))
    .on('tick', () =>
      postMessage({
        type: GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS,
        classes: classNodes,
        classLinks: classLinkNodes
      })
    )
    .alpha(1)
    .velocityDecay(0.5)
    .alphaDecay(0.4)
    .restart();
};

const stopGraphSchemaSimulation = () => {
  graphSchemaSimulation.stop();
};

self.onmessage = event => {
  switch (event.data.type) {
    case START_GRAPH_SCHEMA_SIMULATION:
      startGraphSchemaSimulation(
        event.data.classes,
        event.data.classLinks,
        event.data.dimensions
      );
      break;

    case STOP_GRAPH_SCHEMA_SIMULATION:
      stopGraphSchemaSimulation();
      break;
  }
};
