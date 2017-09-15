const R = require('ramda');
const d3 = require('d3-force');

const {
  START_GRAPH_SCHEMA_SIMULATION,
  STOP_GRAPH_SCHEMA_SIMULATION,
  UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS,
} = require('./force-layout');

const CLASS_FORCE_RADIUS = 125;
const CLASS_LINK_FORCE_RADIUS = 50;
const COLLIDE_FORCE_RADIUS_MULTIPLIER = 1.1;
const LINK_FORCE_DISTANCE = 175;

const graphSchemaSimulation = d3.forceSimulation().stop();

const createCenteringForce = (width, height) =>
  d3.forceCenter(width / 2, height / 2);

const createBoundaryForce = (simulation, width, height) => () =>
  simulation.nodes().forEach((node) => {
    node.x = Math.max(node.r, Math.min(width - node.r, node.x));
    node.y = Math.max(node.r, Math.min(height - node.r, node.y));
  });

const createCollideForce = (radiusMultiplier) =>
  d3.forceCollide((node) => node.r * radiusMultiplier);

const createLinkForce = (links, distance) =>
  d3.forceLink(links).distance(distance);

const updateGraphSchemaElementPositions = (classNodes, classLinkNodes) => {
  postMessage({
    type: UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS,
    classes: classNodes,
    classLinks: classLinkNodes,
  });
};

const startGraphSchemaSimulation = (classes, classLinks, dimensions) => {
  const classNodes = classes.map((c) => {
    return {
      x: c.x,
      y: c.y,
      r: CLASS_FORCE_RADIUS,
      name: c.name,
    };
  });

  const classNodeIndex = R.zipObj(
    classNodes.map((n) => n.name),
    classNodes
  );

  const classLinkNodes = classLinks.map((l) => {
    return {
      x: l.x,
      y: l.y,
      r: CLASS_LINK_FORCE_RADIUS,
      name: l.name,
      source: l.source,
      target: l.target,
    };
  });

  const nodes = R.concat(classNodes, classLinkNodes);

  const links = R.flatten(classLinkNodes.map((n) => {
    return [
      {
        source: classNodeIndex[n.source],
        target: n,
      },
      {
        source: n,
        target: classNodeIndex[n.target],
      },
    ];
  }));

  graphSchemaSimulation
    .nodes(nodes)
    .force('center', createCenteringForce(...dimensions))
    .force('collide', createCollideForce(COLLIDE_FORCE_RADIUS_MULTIPLIER))
    .force('boundary', createBoundaryForce(graphSchemaSimulation, ...dimensions))
    .force('link', createLinkForce(links, LINK_FORCE_DISTANCE))
    .on(
      'tick',
      () => updateGraphSchemaElementPositions(classNodes, classLinkNodes)
    )
    .alpha(1)
    .restart();
};

const stopGraphSchemaSimulation = () => {
  graphSchemaSimulation.stop();
};

self.onmessage = (event) => {
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
