import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

export const icons = {
    index: (props) => <MaterialIcons name="home" size={26} {...props} />,
    explore: (props) => <Feather name="bookmark" size={26} {...props} />,
    create: (props) => <MaterialIcons name="history" size={26} {...props} />,
}