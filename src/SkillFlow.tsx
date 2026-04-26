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
import octopusLogoPng from "./octopus-logo.png";

const FOLDER_SIZE = 140;
const FILE_SIZE = 80;

const macosColors = {
  // macOS Desktop Background
  desktopBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

  // Folder colors - more accurate macOS Big Sur/Monterey style
  folderMain: "#6eb7f8",
  folderLight: "#a8d8f8",
  folderDark: "#4a90d9",
  folderBack: "#5a9fe8",

  // Shadows and highlights
  shadow: "rgba(0, 0, 0, 0.4)",
  highlight: "rgba(255, 255, 255, 0.6)",
  innerShadow: "rgba(0, 0, 0, 0.2)",

  // Text colors
  labelText: "#ffffff",
  textShadow: "rgba(0, 0, 0, 0.9)",

  // UI elements
  menuBar: "rgba(0, 0, 0, 0.75)",
  dock: "rgba(255, 255, 255, 0.2)",
  arrow: "#7c3aed", // deep purple for contrast on yellow
  symlink: "#4c1d95", // darker purple
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
          style={{
            transform: "translate(0, 0)",
          }}
        />
      </g>

      {/* Label text */}
      <text
        x={0}
        y={FOLDER_SIZE * 0.55 + 25}
        textAnchor="middle"
        fill={macosColors.labelText}
        fontSize={11}
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
  isSymlink = false,
}: {
  x: number;
  y: number;
  label: string;
  delay: number;
  isSymlink?: boolean;
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

  const fileColor = isSymlink ? "#bf5af2" : "#0a84ff";

  return (
    <g
      transform={`translate(${x}, ${y + bounce}) scale(${scale})`}
      opacity={opacity}
    >
      {/* File shadow */}
      <ellipse
        cx={0}
        cy={FILE_SIZE * 0.35}
        rx={FILE_SIZE * 0.35}
        ry={FILE_SIZE * 0.08}
        fill={macosColors.shadow}
        opacity={0.3}
      />

      {/* Document body */}
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

      {/* Folded corner */}
      <path
        d={`
          M ${FILE_SIZE * 0.0} ${-FILE_SIZE * 0.35}
          L ${FILE_SIZE * 0.3} ${-FILE_SIZE * 0.35}
          L ${FILE_SIZE * 0.3} ${-FILE_SIZE * 0.2}
          L ${FILE_SIZE * 0.1} ${-FILE_SIZE * 0.35}
          Z
        `}
        fill={fileColor}
        opacity={0.9}
      />

      {/* Color stripe */}
      <rect
        x={-FILE_SIZE * 0.3}
        y={-FILE_SIZE * 0.35}
        width={FILE_SIZE * 0.6}
        height={FILE_SIZE * 0.12}
        rx={4}
        fill={fileColor}
      />

      {/* Document lines */}
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
        x2={FILE_SIZE * 0.2}
        y2={-FILE_SIZE * 0.05}
        stroke="rgba(0, 0, 0, 0.2)"
        strokeWidth={1}
      />
      <line
        x1={-FILE_SIZE * 0.2}
        y1={FILE_SIZE * 0.05}
        x2={FILE_SIZE * 0.1}
        y2={FILE_SIZE * 0.05}
        stroke="rgba(0, 0, 0, 0.2)"
        strokeWidth={1}
      />

      {/* File label */}
      <text
        x={0}
        y={FILE_SIZE * 0.35 + 20}
        textAnchor="middle"
        fill={macosColors.labelText}
        fontSize={11}
        fontWeight="500"
        style={{
          textShadow: `0 1px 3px ${macosColors.textShadow}`,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
          letterSpacing: "0.2px",
        }}
      >
        {label}
      </text>

      {/* Symlink indicator */}
      {isSymlink && (
        <text
          x={0}
          y={FILE_SIZE * 0.35 + 35}
          textAnchor="middle"
          fill="#bf5af2"
          fontSize={9}
          fontWeight="600"
        >
          ↩
        </text>
      )}
    </g>
  );
};

const MacOSArrow = ({
  fromX,
  fromY,
  toX,
  toY,
  delay,
  color,
  label,
  labelEn,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  delay: number;
  color: string;
  label: string;
  labelEn?: string;
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

  const currentX = interpolate(progress, [0, 1], [fromX, toX]);
  const currentY = interpolate(progress, [0, 1], [fromY, toY]);

  const opacity = interpolate(frame - delay, [0, 5, 25, 35], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Calculate arrow direction
  const deltaX = toX - fromX;
  const deltaY = toY - fromY;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  return (
    <g opacity={opacity}>
      {/* Moving arrow */}
      <g transform={`translate(${currentX}, ${currentY}) rotate(${angle})`}>
        {/* Arrow glow */}
        <circle cx={0} cy={0} r={18} fill={color} opacity={0.35} />

        {/* Arrow body */}
        <line
          x1={-28}
          y1={0}
          x2={28}
          y2={0}
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* Arrow head */}
        <polygon
          points="28,0 18,-10 18,10"
          fill={color}
        />

        {/* Arrow highlight */}
        <line
          x1={-28}
          y1={-1}
          x2={28}
          y2={-1}
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth={1}
          strokeLinecap="round"
        />
      </g>

      {/* Label */}
      <g>
        {labelEn ? (
          <>
            <text
              x={(fromX + toX) / 2}
              y={(fromY + toY) / 2 - 45}
              textAnchor="middle"
              fill="white"
              fontSize={14}
              fontWeight="700"
              style={{
                textShadow: `0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)`,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {label}
            </text>
            <text
              x={(fromX + toX) / 2}
              y={(fromY + toY) / 2 - 25}
              textAnchor="middle"
              fill="white"
              fontSize={11}
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
            x={(fromX + toX) / 2}
            y={(fromY + toY) / 2 - 35}
            textAnchor="middle"
            fill="white"
            fontSize={14}
            fontWeight="700"
            style={{
              textShadow: `0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)`,
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
            }}
          >
            {label}
          </text>
        )}
      </g>
    </g>
  );
};

const MenuBar = ({ width }: { width: number }) => {
  return (
    <g>
      {/* Menu bar background */}
      <rect
        x={0}
        y={0}
        width={width}
        height={25}
        fill={macosColors.menuBar}
      />

      {/* Apple logo */}
      <text x={20} y={17} fill="white" fontSize={14} fontWeight="bold">
        
      </text>

      {/* Bold menu items (like macOS) */}
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

      {/* Right side */}
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

export const SkillFlow = () => {
  const { width, height } = useVideoConfig();

  const positions = {
    cursor: { x: width * 0.15, y: height * 0.4 },
    manager: { x: width * 0.5, y: height * 0.4 },
    claude: { x: width * 0.85, y: height * 0.4 },
  };

  return (
    <AbsoluteFill>
      <svg width={width} height={height}>
        <defs>
          {/* Window shadow */}
          <filter id="windowShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation={6} />
            <feOffset dx={0} dy={4} result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope={0.3} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
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

        {/* Menu Bar */}
        <MenuBar width={width} />

        {/* Desktop area */}
        <g transform="translate(0, 30)">
          {/* Connection lines */}
          <line
            x1={positions.cursor.x + FOLDER_SIZE / 2 + 20}
            y1={positions.cursor.y}
            x2={positions.manager.x - FOLDER_SIZE / 2 - 20}
            y2={positions.manager.y}
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth={1.5}
            strokeDasharray="6,3"
          />
          <line
            x1={positions.manager.x + FOLDER_SIZE / 2 + 20}
            y1={positions.manager.y}
            x2={positions.claude.x - FOLDER_SIZE / 2 - 20}
            y2={positions.claude.y}
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth={1.5}
            strokeDasharray="6,3"
          />

          {/* Folders */}
          <MacOSFolder
            x={positions.cursor.x}
            y={positions.cursor.y}
            label="~/.cursor/skills"
          />
          <MacOSFolder
            x={positions.manager.x}
            y={positions.manager.y}
            label="~/.skills-managers/skills | 根目录"
          />
          <MacOSFolder
            x={positions.claude.x}
            y={positions.claude.y}
            label="~/.claude/skills"
          />

          {/* Brand icons on folders - render after folders but before skill files */}
          <BrandIcon
            x={positions.cursor.x}
            y={positions.cursor.y + 3}
            icon={cursorIcon}
            size={26}
          />
          <BrandIcon
            x={positions.manager.x}
            y={positions.manager.y + 3}
            icon={octopusLogoPng}
            size={26}
          />
          <BrandIcon
            x={positions.claude.x}
            y={positions.claude.y + 3}
            icon={claudeIcon}
            size={26}
          />

          {/* Animated files */}
          <MacOSFile
            x={positions.cursor.x}
            y={positions.cursor.y - 100}
            label="my-skill"
            delay={0}
          />

          <MacOSArrow
            fromX={positions.cursor.x}
            fromY={positions.cursor.y}
            toX={positions.manager.x}
            toY={positions.manager.y}
            delay={20}
            color={macosColors.arrow}
            label="复制"
            labelEn="Copy"
          />

          <MacOSFile
            x={positions.manager.x}
            y={positions.manager.y - 100}
            label="my-skill"
            delay={50}
          />

          <MacOSArrow
            fromX={positions.manager.x}
            fromY={positions.manager.y}
            toX={positions.claude.x}
            toY={positions.claude.y}
            delay={70}
            color={macosColors.symlink}
            label="软链接"
            labelEn="Symlink"
          />

          <MacOSFile
            x={positions.claude.x}
            y={positions.claude.y - 100}
            label="my-skill"
            delay={100}
            isSymlink={true}
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
