PGDMP                     
    y            OtvorenoRacunarstvo    13.2    13.2     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    17281    OtvorenoRacunarstvo    DATABASE     t   CREATE DATABASE "OtvorenoRacunarstvo" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Croatian_Croatia.1250';
 %   DROP DATABASE "OtvorenoRacunarstvo";
                postgres    false            ?            1259    17282    mjerenje    TABLE     ?  CREATE TABLE public.mjerenje (
    tlak integer NOT NULL,
    vrijeme time without time zone NOT NULL,
    datum date NOT NULL,
    elevacija smallint NOT NULL,
    mjesto character varying(40) NOT NULL,
    postaja character varying(50) NOT NULL,
    mjeritelji character varying[] NOT NULL,
    "geografska duzina" double precision NOT NULL,
    "geografska sirina" double precision NOT NULL,
    zupanija character varying(40) NOT NULL
);
    DROP TABLE public.mjerenje;
       public         heap    postgres    false            ?            1259    17300    mjesto    TABLE     ?   CREATE TABLE public.mjesto (
    pbr integer NOT NULL,
    nazmjesto character varying(40) NOT NULL,
    sifzupanija smallint
);
    DROP TABLE public.mjesto;
       public         heap    postgres    false            ?            1259    17285    osoba    TABLE     ?   CREATE TABLE public.osoba (
    ime character varying(25) NOT NULL,
    prezime character varying(25) NOT NULL,
    oib character varying(11) NOT NULL
);
    DROP TABLE public.osoba;
       public         heap    postgres    false            ?            1259    17290    postaja    TABLE     v   CREATE TABLE public.postaja (
    imepostaja character varying(50) NOT NULL,
    id character varying(10) NOT NULL
);
    DROP TABLE public.postaja;
       public         heap    postgres    false            ?            1259    17295    zupanija    TABLE     t   CREATE TABLE public.zupanija (
    sifzupanija smallint NOT NULL,
    nazzupanija character varying(40) NOT NULL
);
    DROP TABLE public.zupanija;
       public         heap    postgres    false            ?          0    17282    mjerenje 
   TABLE DATA           ?   COPY public.mjerenje (tlak, vrijeme, datum, elevacija, mjesto, postaja, mjeritelji, "geografska duzina", "geografska sirina", zupanija) FROM stdin;
    public          postgres    false    200   ?       ?          0    17300    mjesto 
   TABLE DATA           =   COPY public.mjesto (pbr, nazmjesto, sifzupanija) FROM stdin;
    public          postgres    false    204          ?          0    17285    osoba 
   TABLE DATA           2   COPY public.osoba (ime, prezime, oib) FROM stdin;
    public          postgres    false    201   <       ?          0    17290    postaja 
   TABLE DATA           1   COPY public.postaja (imepostaja, id) FROM stdin;
    public          postgres    false    202   Y       ?          0    17295    zupanija 
   TABLE DATA           <   COPY public.zupanija (sifzupanija, nazzupanija) FROM stdin;
    public          postgres    false    203   v       8           2606    17304    mjesto mjesto_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.mjesto
    ADD CONSTRAINT mjesto_pkey PRIMARY KEY (pbr);
 <   ALTER TABLE ONLY public.mjesto DROP CONSTRAINT mjesto_pkey;
       public            postgres    false    204            2           2606    17289    osoba osoba_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_pkey PRIMARY KEY (oib);
 :   ALTER TABLE ONLY public.osoba DROP CONSTRAINT osoba_pkey;
       public            postgres    false    201            4           2606    17294    postaja postaja_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.postaja
    ADD CONSTRAINT postaja_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.postaja DROP CONSTRAINT postaja_pkey;
       public            postgres    false    202            6           2606    17299    zupanija županije_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.zupanija
    ADD CONSTRAINT "županije_pkey" PRIMARY KEY (sifzupanija);
 C   ALTER TABLE ONLY public.zupanija DROP CONSTRAINT "županije_pkey";
       public            postgres    false    203            9           2606    17305    mjesto mjesto_sifzupanija_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.mjesto
    ADD CONSTRAINT mjesto_sifzupanija_fkey FOREIGN KEY (sifzupanija) REFERENCES public.zupanija(sifzupanija) NOT VALID;
 H   ALTER TABLE ONLY public.mjesto DROP CONSTRAINT mjesto_sifzupanija_fkey;
       public          postgres    false    2870    204    203            ?   g  x????n?0?g?)ϱ?#EQ?#h?4???Ptab"?$?%yHйS??A?.?{?hɱt?A8H???c?0??ʹ$?q? ?pE@2???rO?z???^?}???՞.???????e??e??8????()23??v????#`@.??????u??OhC?u<Ӿtt^z?{?!#??,?0ˈs??@?i_??޾?NX???%L-SE?λ?-I ,mCo?5"??z?(?? ?׍C???D?K?V ?????W?mJ7Y?j?[[~"??????????D?9???4??麦???u_?[]????̋.{??H?_Eȴ0?݇t,v??-Co??9???3?9?2gH?SZ??ycS?Y?#?Pm?[y?ו{Q??v(???D)?H??%>o
??E???.???s???r?$?"?^????5'?????????J&* 	 Yv?A????: ?,D??0;?x1???B??L?~kW??s???,??yzLű????7?[?խ-p?t?¸??S???b+?L?zU?neL?NFY?#/?^??th2?+D??)T??L?!S?߭?Mf?`???!?}l??۾!??m??7?e???H??0iL?0 ?ݳ??h4?4X?      ?      x?????? ? ?      ?      x?????? ? ?      ?      x?????? ? ?      ?      x?????? ? ?     