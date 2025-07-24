import Lanyard from '../blocks/Components/Lanyard/Lanyard'
import LetterGlitch from '../blocks/Backgrounds/LetterGlitch/LetterGlitch';


const UserProfile = () => {
  return (
      <LetterGlitch glitchSpeed={100} centerVignette={true} outerVignette={true} smooth={true}>
        <div className="relative z-30 w-full hidden md:hidden lg:flex h-[120vh] lg:h-[100vh] origin-top flex-col items-center justify-start">
          <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} fov={20} transparent={true} />
        </div>
      </LetterGlitch>
  );
};

export default UserProfile; 