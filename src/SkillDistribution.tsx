import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import macFolderIcon from "./mac-folder.png";
import backgroundImage from "./bg.png";
import claudeIcon from "./claude.svg";
import cursorIcon from "./cursor.svg";
import gptIcon from "./GPT.svg";
import octopusLogoPng from "./octopus-logo.png";

const FOLDER_SIZE = 140;
const FILE_SIZE = 80;

const macosColors = {
  desktopBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  folderMain: "#6eb7f8",
  folderLight: "#a8d8f8",
  folderDark: "#4a90d9",
  folderBack: "#5a9fe8",
  shadow: "rgba(0, 0, 0, 0.4)",
  highlight: "rgba(255, 255, 255, 0.6)",
  innerShadow: "rgba(0, 0, 0, 0.2)",
  labelText: "#ffffff",
  textShadow: "rgba(0, 0, 0, 0.9)",
  menuBar: "rgba(0, 0, 0, 0.75)",
  dock: "rgba(255, 255, 255, 0.2)",
  arrow: "#32d74b",
  symlink: "#bf5af2",
  distribute: "#ff9500",
};

const MacOSFolder = ({ x, y, label }: { x: number; y: number; label: string }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        {/* Drop shadow for the folder icon */}
        <filter id="folderIconShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={4} />
          <feOffset dx={0} dy={3} result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={0.3} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse
        cx={0}
        cy={FOLDER_SIZE * 0.42}
        rx={FOLDER_SIZE * 0.38}
        ry={FOLDER_SIZE * 0.05}
        fill="rgba(0, 0, 0, 0.25)"
      />

      {/* Folder icon */}
      <g filter="url(#folderIconShadow)">
        <image
          href={macFolderIcon}
          x={-FOLDER_SIZE / 2}
          y={-FOLDER_SIZE / 2}
          width={FOLDER_SIZE}
          height={FOLDER_SIZE}
        />
      </g>

      {/* Label text */}
      <text
        x={0}
        y={FOLDER_SIZE * 0.55 + 25}
        textAnchor="middle"
        fill={macosColors.labelText}
        fontSize={10}
        fontWeight="500"
        style={{
          textShadow: `0 2px 4px ${macosColors.textShadow}, 0 1px 2px ${macosColors.textShadow}`,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
          letterSpacing: "0.2px",
        }}
      >
        {label}
      </text>
    </g>
  );
};

const MacOSFile = ({
  x,
  y,
  label,
  delay,
  color = "#0a84ff",
}: {
  x: number;
  y: number;
  label: string;
  delay: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 80,
    },
  });

  const bounce = interpolate(
    Math.sin((frame - delay) * 0.15),
    [-1, 1],
    [-8, 8]
  );

  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <g
      transform={`translate(${x}, ${y + bounce}) scale(${scale})`}
      opacity={opacity}
    >
      <ellipse
        cx={0}
        cy={FILE_SIZE * 0.35}
        rx={FILE_SIZE * 0.35}
        ry={FILE_SIZE * 0.08}
        fill={macosColors.shadow}
        opacity={0.3}
      />

      <rect
        x={-FILE_SIZE * 0.3}
        y={-FILE_SIZE * 0.35}
        width={FILE_SIZE * 0.6}
        height={FILE_SIZE * 0.7}
        rx={4}
        fill="#ffffff"
        stroke="rgba(0, 0, 0, 0.1)"
        strokeWidth={0.5}
      />

      <path
        d={`
          M ${FILE_SIZE * 0.0} ${-FILE_SIZE * 0.35}
          L ${FILE_SIZE * 0.3} ${-FILE_SIZE * 0.35}
          L ${FILE_SIZE * 0.3} ${-FILE_SIZE * 0.2}
          L ${FILE_SIZE * 0.1} ${-FILE_SIZE * 0.35}
        `}
        fill={color}
        opacity={0.9}
      />

      <rect
        x={-FILE_SIZE * 0.3}
        y={-FILE_SIZE * 0.35}
        width={FILE_SIZE * 0.6}
        height={FILE_SIZE * 0.12}
        rx={4}
        fill={color}
      />

      <line
        x1={-FILE_SIZE * 0.2}
        y1={-FILE_SIZE * 0.15}
        x2={FILE_SIZE * 0.2}
        y2={-FILE_SIZE * 0.15}
        stroke="rgba(0, 0, 0, 0.2)"
        strokeWidth={1}
      />
      <line
        x1={-FILE_SIZE * 0.2}
        y1={-FILE_SIZE * 0.05}
        x2={FILE_SIZE * 0.1}
        y2={-FILE_SIZE * 0.05}
        stroke="rgba(0, 0, 0, 0.2)"
        strokeWidth={1}
      />

      <text
        x={0}
        y={FILE_SIZE * 0.35 + 20}
        textAnchor="middle"
        fill={macosColors.labelText}
        fontSize={10}
        fontWeight="500"
        style={{
          textShadow: `0 1px 3px ${macosColors.textShadow}`,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
          letterSpacing: "0.2px",
        }}
      >
        {label}
      </text>
    </g>
  );
};

const DistributionArrow = ({
  fromX,
  fromY,
  toX,
  toY,
  delay,
  color,
  label,
  labelEn,
  curveOffset = 0,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  delay: number;
  color: string;
  label?: string;
  labelEn?: string;
  curveOffset?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 70,
    },
  });

  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2 + curveOffset;

  const t = progress;

  const currentX = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * midX + t * t * toX;
  const currentY = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * midY + t * t * toY;

  const opacity = interpolate(frame - delay, [0, 5, 25, 35], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <g>
      <g opacity={opacity} transform={`translate(${currentX}, ${currentY}) rotate(${Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI)})`}>
        <circle cx={0} cy={0} r={18} fill={color} opacity={0.35} />

        <line
          x1={-28}
          y1={0}
          x2={28}
          y2={0}
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
        />

        <polygon
          points="28,0 18,-10 18,10"
          fill={color}
        />

        <line
          x1={-28}
          y1={-1}
          x2={28}
          y2={-1}
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth={1}
          strokeLinecap="round"
        />
      </g>

      {label ? (
        labelEn ? (
          <>
            <text
              x={midX}
              y={fromY + (toY - fromY) / 2 - 15}
              textAnchor="middle"
              fill="white"
              fontSize={13}
              fontWeight="700"
              style={{
                textShadow: `0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)`,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {label}
            </text>
            <text
              x={midX}
              y={fromY + (toY - fromY) / 2 + 2}
              textAnchor="middle"
              fill="white"
              fontSize={10}
              fontWeight="500"
              style={{
                textShadow: `0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.6)`,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {labelEn}
            </text>
          </>
        ) : (
          <text
            x={midX}
            y={fromY + (toY - fromY) / 2 - 5}
            textAnchor="middle"
            fill="white"
            fontSize={13}
            fontWeight="700"
            style={{
              textShadow: `0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)`,
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
            }}
          >
            {label}
          </text>
        )
      ) : null}
    </g>
  );
};

const MenuBar = ({ width }: { width: number }) => {
  return (
    <g>
      <rect
        x={0}
        y={0}
        width={width}
        height={25}
        fill={macosColors.menuBar}
      />

      <text x={20} y={17} fill="white" fontSize={14} fontWeight="bold">
        
      </text>

      <text x={60} y={17} fill="white" fontSize={13} fontWeight="600">
        Finder
      </text>
      <text x={120} y={17} fill="white" fontSize={13} fontWeight="500">
        File
      </text>
      <text x={165} y={17} fill="white" fontSize={13} fontWeight="500">
        Edit
      </text>
      <text x={215} y={17} fill="white" fontSize={13} fontWeight="500">
        View
      </text>
      <text x={265} y={17} fill="white" fontSize={13} fontWeight="500">
        Go
      </text>
      <text x={305} y={17} fill="white" fontSize={13} fontWeight="500">
        Window
      </text>
      <text x={375} y={17} fill="white" fontSize={13} fontWeight="500">
        Help
      </text>

      <text x={width - 120} y={17} fill="white" fontSize={12}>
        🔋 100%
      </text>
      <text x={width - 70} y={17} fill="white" fontSize={12}>
        📶
      </text>
      <text x={width - 45} y={17} fill="white" fontSize={12}>
        🔍
      </text>
    </g>
  );
};

const BrandIcon = ({ x, y, icon, size = 26 }: { x: number; y: number; icon: string; size?: number }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <filter id={`brandIconShadow_${x}_${y}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={2} />
          <feOffset dx={0} dy={1} result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={0.3} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle
        cx={0}
        cy={0}
        r={size / 2 + 5}
        fill="rgba(255, 255, 255, 0.95)"
        filter={`url(#brandIconShadow_${x}_${y})`}
      />

      {/* Icon */}
      <image
        href={icon}
        x={-size / 2}
        y={-size / 2}
        width={size}
        height={size}
      />
    </g>
  );
};

export const SkillDistribution = () => {
  const { width, height } = useVideoConfig();

  const positions = {
    source: { x: width * 0.5, y: height * 0.25 },
    cursor: { x: width * 0.15, y: height * 0.55 },
    codex: { x: width * 0.5, y: height * 0.55 },
    claude: { x: width * 0.85, y: height * 0.55 },
  };

  return (
    <AbsoluteFill>
      <svg width={width} height={height}>
        <defs>
          <filter id="glowDist" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={4} result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Desktop background - use provided image */}
        <image
          href={backgroundImage}
          x={0}
          y={0}
          width={width}
          height={height}
          preserveAspectRatio="xMidYMid slice"
        />

        <MenuBar width={width} />

        <g transform="translate(0, 30)">
          {/* Static connection paths (always visible) */}
          <g opacity="0.4">
            <path
              d={`M ${positions.source.x} ${positions.source.y} Q ${(positions.source.x + positions.cursor.x) / 2} ${(positions.source.y + positions.cursor.y) / 2 - 80} ${positions.cursor.x} ${positions.cursor.y}`}
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth={2}
              strokeDasharray="6,3"
              fill="none"
            />
            <path
              d={`M ${positions.source.x} ${positions.source.y} Q ${(positions.source.x + positions.codex.x) / 2} ${(positions.source.y + positions.codex.y) / 2 - 80} ${positions.codex.x} ${positions.codex.y}`}
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth={2}
              strokeDasharray="6,3"
              fill="none"
            />
            <path
              d={`M ${positions.source.x} ${positions.source.y} Q ${(positions.source.x + positions.claude.x) / 2} ${(positions.source.y + positions.claude.y) / 2 - 80} ${positions.claude.x} ${positions.claude.y}`}
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth={2}
              strokeDasharray="6,3"
              fill="none"
            />
          </g>

          <MacOSFolder
            x={positions.source.x}
            y={positions.source.y}
            label="~/.skills-managers/skills | 根目录"
          />

          <MacOSFolder
            x={positions.cursor.x}
            y={positions.cursor.y}
            label="Cursor/Skills | Cursor技能目录"
          />

          <MacOSFolder
            x={positions.codex.x}
            y={positions.codex.y}
            label="Codex/Skills | Codex技能目录"
          />

          <MacOSFolder
            x={positions.claude.x}
            y={positions.claude.y}
            label="Claude/Skills | Claude技能目录"
          />

          {/* Brand icons for cursor, codex, claude - render before their skill files */}
          <BrandIcon
            x={positions.cursor.x}
            y={positions.cursor.y}
            icon={cursorIcon}
            size={26}
          />
          <BrandIcon
            x={positions.codex.x}
            y={positions.codex.y}
            icon={gptIcon}
            size={26}
          />
          <BrandIcon
            x={positions.claude.x}
            y={positions.claude.y}
            icon={claudeIcon}
            size={26}
          />

          <MacOSFile
            x={positions.source.x}
            y={positions.source.y - 100}
            label="my-skill"
            delay={0}
          />

          {/* Brand icon for source center - render after skill file so it's visible */}
          <BrandIcon
            x={positions.source.x}
            y={positions.source.y + 12}
            icon={octopusLogoPng}
            size={26}
          />

          <DistributionArrow
            fromX={positions.source.x}
            fromY={positions.source.y}
            toX={positions.cursor.x}
            toY={positions.cursor.y}
            delay={30}
            color={macosColors.distribute}
            label="软连接"
            labelEn="Symlink"
            curveOffset={-40}
          />

          <MacOSFile
            x={positions.cursor.x}
            y={positions.cursor.y - 100}
            label="my-skill"
            delay={60}
          />

          <DistributionArrow
            fromX={positions.source.x}
            fromY={positions.source.y}
            toX={positions.codex.x}
            toY={positions.codex.y}
            delay={70}
            color={macosColors.distribute}
            curveOffset={-40}
          />

          <MacOSFile
            x={positions.codex.x}
            y={positions.codex.y - 100}
            label="my-skill"
            delay={100}
          />

          <DistributionArrow
            fromX={positions.source.x}
            fromY={positions.source.y}
            toX={positions.claude.x}
            toY={positions.claude.y}
            delay={110}
            color={macosColors.distribute}
            label="软连接"
            labelEn="Symlink"
            curveOffset={-40}
          />

          <MacOSFile
            x={positions.claude.x}
            y={positions.claude.y - 100}
            label="my-skill"
            delay={140}
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
